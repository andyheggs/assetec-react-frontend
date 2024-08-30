import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext/AuthContext';
import IndividualHolding from './IndividualHolding';
import { useNavigate } from 'react-router-dom';

const InvestmentHoldings = () => {
    const [holdings, setHoldings] = useState([]);
    const [selectedHoldingId, setSelectedHoldingId] = useState(null); 
    const { authTokens } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHoldings = async () => {
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
                    console.error('Failed to fetch holdings');
                }
            } catch (error) {
                console.error('Error fetching holdings:', error);
            }
        };

        fetchHoldings();
    }, [authTokens]);

    const handleDelete = async (holdingId) => {
        if (window.confirm('Are you sure you want to delete this holding?')) {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/stocks/${holdingId}/`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${authTokens.access}`, 
                    },
                });

                if (response.ok) {
                    alert('Holding deleted successfully!');
                    setHoldings((prevHoldings) => prevHoldings.filter((holding) => holding.id !== holdingId));
                } else {
                    alert('Failed to delete holding. Please try again.');
                }
            } catch (error) {
                console.error('Error deleting holding:', error);
                alert('An error occurred. Please try again.');
            }
        }
    };

    const calculateTotalGain = (holding) => {
        if (!holding.new_share_price) {
            return "0%";
        }

        const purchasePrice = parseFloat(holding.share_price);
        const newSharePrice = parseFloat(holding.new_share_price);

        const gain = ((newSharePrice - purchasePrice) / purchasePrice) * 100;
        return `${gain.toFixed(2)}%`;
    };

    const getGainColor = (gain) => {
        const gainValue = parseFloat(gain);

        if (gainValue > 0) {
            return 'neon-green';
        } else if (gainValue < 0) {
            return 'crimson-red';
        } else {
            return 'white';
        }
    };

    const handleHoldingClick = (holdingId) => {
        setSelectedHoldingId(holdingId); 
    };

    return (
        <div className="investment-holdings-container">
            <h2>Your Investments</h2>
            <table className="holdings-table">
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Company Code</th>
                        <th>Quantity</th>
                        <th>Purchase Price</th>
                        <th>Total Investment</th>
                        <th>Total Gain</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {holdings.map((holding) => (
                        <tr key={holding.id}>
                            <td>
                                <button 
                                    className="holding-name-button" 
                                    onClick={() => handleHoldingClick(holding.id)} 
                                >
                                    {holding.company_name}
                                </button>
                            </td>
                            <td>{holding.company_code}</td>
                            <td>{holding.quantity}</td>
                            <td>${holding.share_price}</td>
                            <td>${holding.total_investment}</td>
                            <td className={getGainColor(calculateTotalGain(holding))}>
                                {calculateTotalGain(holding)}
                            </td>
                            <td>
                                <button onClick={() => navigate(`${import.meta.env.VITE_BACK_END_SERVER_URL}/stocks/${holding.id}`)}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(holding.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Render IndividualHolding if a holding is selected */}
            {selectedHoldingId && <IndividualHolding holdingId={selectedHoldingId} />}
        </div>
    );
};

export default InvestmentHoldings;
