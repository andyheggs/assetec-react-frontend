import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext/AuthContext';

const TopPerformers = () => {
    const [topPerformers, setTopPerformers] = useState([]);
    const { authTokens } = useContext(AuthContext);

    useEffect(() => {
        const fetchTopPerformers = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/stocks/top-performers/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authTokens.access}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setTopPerformers(data);
                } else {
                    console.error('Failed to fetch top performers');
                }
            } catch (error) {
                console.error('Error fetching top performers:', error);
            }
        };

        fetchTopPerformers();
    }, [authTokens]);

    const calculatePerformance = (performer) => {
        const purchasePrice = parseFloat(performer.share_price) || 0;
        const newSharePrice = parseFloat(performer.new_share_price) || purchasePrice;
        return (((newSharePrice - purchasePrice) / purchasePrice) * 100).toFixed(2);
    };

    return (
        <div className="top-performers-container">
            <h2>Your Top-10 Performers</h2>
            <br></br>
            <p>Ranked by total percentage gain</p>
            <ul>
                {topPerformers.map((performer, index) => (
                    <li key={index}>
                        <span>{performer.company_name}</span>
                        <span>{calculatePerformance(performer)}%</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopPerformers;
