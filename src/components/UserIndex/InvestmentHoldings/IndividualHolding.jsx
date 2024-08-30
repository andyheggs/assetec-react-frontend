import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthContext';
import './IndividualHolding.css';

const IndividualHolding = () => {
    const [holding, setHolding] = useState(null);
    const { authTokens } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate(); // Use react-router-dom for navigation

    useEffect(() => {
        if (id) {
            const fetchHoldingData = async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/stocks/${id}/`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authTokens.access}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setHolding(data);
                    } else {
                        console.error('Failed to fetch holding details');
                    }
                } catch (error) {
                    console.error('Error fetching holding details:', error);
                }
            };

            fetchHoldingData();
        }
    }, [id, authTokens]);

    const calculatePerformance = () => {
        if (!holding) return 'N/A';
        const purchasePrice = parseFloat(holding.share_price) || 0;
        const newSharePrice = parseFloat(holding.new_share_price) || purchasePrice;
        return (((newSharePrice - purchasePrice) / purchasePrice) * 100).toFixed(2);
    };

    if (!holding) {
        return <div>Loading...</div>;
    }

    return (
        <div className="individual-holding-container">
            <h2>{holding.company_name}</h2>
            <p>Company Code: {holding.company_code}</p>
            <p>Quantity: {holding.quantity}</p>
            <p>Purchase Price: ${holding.share_price}</p>
            <p>New Share Price: ${holding.new_share_price || 'N/A'}</p>
            <p>Total Investment: ${holding.total_investment}</p>
            <p>Trade Date: {new Date(holding.trade_date).toLocaleDateString()}</p>
            <p>Description: {holding.description}</p>
            <p>Performance: {calculatePerformance()}%</p>
            <button onClick={() => navigate(`/manage-holding/${id}`)}>Manage Holding</button>
        </div>
    );
};

export default IndividualHolding;
