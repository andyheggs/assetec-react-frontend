import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext'; // Ensure AuthContext is imported
import { useNavigate } from 'react-router-dom';
import './CreateHolding.css';

const CreateHolding = () => {
    const { authTokens, user, logout } = useContext(AuthContext); // Access authTokens and user from context
    const [formData, setFormData] = useState({
        company_code: '',
        company_name: '',
        trade_date: '',
        quantity: '',
        share_price: '',
        brokerage_fees: '',
        total_investment: '',
        description: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const calculateTotalInvestment = () => {
        const quantity = parseFloat(formData.quantity) || 0;
        const sharePrice = parseFloat(formData.share_price) || 0;
        const brokerageFees = parseFloat(formData.brokerage_fees) || 0;
        return quantity * sharePrice + brokerageFees;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const totalInvestment = calculateTotalInvestment();

        try {
            const response = await fetch('http://127.0.0.1:8000/stocks/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`, // Include Authorization header
                },
                body: JSON.stringify({ ...formData, total_investment: totalInvestment })
            });

            if (response.ok) {
                alert('Holding added successfully!');
                navigate('/index'); // Redirect to index page after success
            } else {
                const errorData = await response.json();
                console.error('Failed to add holding:', errorData);
                alert('Failed to add holding. Please try again.');
            }
        } catch (error) {
            console.error('Error adding holding:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleSignOut = () => {
        logout(); // Handle logout action
        navigate('/sign-in'); // Redirect to sign-in page after logout
    };

    return (
        <div className="landing-container">
            <div className="header">
                <div className="logo-container">
                    <img 
                        src="https://res.cloudinary.com/dim47nr4g/image/upload/v1724788755/Project_4-Logo-i_g0noth.png" 
                        alt="Assetec Logo" 
                        className="logo"
                    />
                    <div className="logo-name">assetec</div>
                </div>
                <div>
                    {user && user.profile_image && (
                        <img 
                            src={user.profile_image} 
                            alt="Profile" 
                            className="profile-image"               
                        />
                    )}
                </div>    
                <div className="nav-links">
                    <div className="nav-button signup-button" onClick={handleSignOut}>
                        Sign-out
                    </div>
                </div>
            </div>

            <div className="create-holding-container">
                <h2>Add New Holding</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="company_code">Company Code</label>
                        <input
                            type="text"
                            id="company_code"
                            name="company_code"
                            placeholder="Stock ticker symbol, e.g., AAPL"
                            value={formData.company_code}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="company_name">Company Name</label>
                        <input
                            type="text"
                            id="company_name"
                            name="company_name"
                            placeholder="Full name of the company, e.g., Apple Inc."
                            value={formData.company_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="trade_date">Trade Date</label>
                        <input
                            type="date"
                            id="trade_date"
                            name="trade_date"
                            value={formData.trade_date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            placeholder="Number of shares purchased"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="share_price">Share Price</label>
                        <input
                            type="number"
                            id="share_price"
                            name="share_price"
                            placeholder="Price per share at the time of purchase"
                            value={formData.share_price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="brokerage_fees">Brokerage Fees</label>
                        <input
                            type="number"
                            id="brokerage_fees"
                            name="brokerage_fees"
                            placeholder="Any brokerage fees or taxes associated with the purchase"
                            value={formData.brokerage_fees}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Relevant notes or information specific to this purchase"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Add Holding</button>
                </form>
            </div>
        </div>    
    );
};

export default CreateHolding;
