import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext/AuthContext';


const PortfolioOverview = () => {
    const [holdings, setHoldings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user, authTokens } = useContext(AuthContext);

    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/stocks/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authTokens.access}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setHoldings(data);
                } else {
                    console.error('Failed to fetch portfolio data');
                }
            } catch (error) {
                console.error('Error fetching portfolio data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPortfolioData();
    }, [authTokens]);

    const calculateTotalInvestmentValue = () => {
        return holdings.reduce((total, holding) => total + parseFloat(holding.total_investment || 0), 0).toFixed(2);
    };

    const calculatePerformance = () => {
        const totalInvestment = calculateTotalInvestmentValue();
        const currentValue = holdings.reduce((total, holding) => {
            const newSharePrice = parseFloat(holding.new_share_price) || parseFloat(holding.share_price);
            return total + (newSharePrice * parseFloat(holding.quantity));
        }, 0).toFixed(2);
        return (((currentValue - totalInvestment) / totalInvestment) * 100).toFixed(2);
    };

    if (isLoading) {
        return <div>Loading portfolio...</div>;
    }

    return (
        <div className="portfolio-overview-container">
            <h2>{user?.username}'s Portfolio Overview</h2>

            {!holdings.length ? (
                <div className="portfolio-overview-empty">
                    <h2>Welcome, {user?.username}!</h2>
                    <p>Your portfolio is currently empty. Start by adding your first investment.</p>
                </div>
            ) : (
                <div className="portfolio-summary">
                    <div className="summary-item">
                        <h3>Total Investment Value</h3>
                        <p>${calculateTotalInvestmentValue()}</p>
                    </div>
                    <div className="summary-item">
                        <h3>Number of Holdings</h3>
                        <p>{holdings.length}</p>
                    </div>
                    <div className="summary-item">
                        <h3>Overall Performance</h3>
                        <p>{calculatePerformance()}%</p>
                    </div>
                </div>
            )}

            <button onClick={() => window.location.href = '/create-holding'}>Add Investment</button>
        </div>
    );
};

export default PortfolioOverview;
