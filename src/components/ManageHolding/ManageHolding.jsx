import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';
import './ManageHolding.css';

const ManageHolding = () => {
    const { authTokens } = useContext(AuthContext);
    const { id } = useParams();
    const [formData, setFormData] = useState({
        company_code: '',
        company_name: '',
        trade_date: '',
        quantity: '',
        share_price: '',
        new_share_price: '',
        brokerage_fees: '',
        total_investment: '',
        description: ''
    });

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        const fetchHoldingData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/stocks/${id}/`, {
                    signal: controller.signal,
                    headers: {
                        'Authorization': `Bearer ${authTokens.access}`, // Include Authorization header
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        ...data,
                        quantity: data.quantity || '', // Ensure no null values
                        share_price: data.share_price || '',
                        new_share_price: data.new_share_price || '',
                        brokerage_fees: data.brokerage_fees || '',
                    });
                    setIsLoading(false);
                } else {
                    console.error('Failed to fetch holding data.');
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Error fetching holding data:', error);
                }
            }
        };

        fetchHoldingData();

        return () => {
            controller.abort(); // Clean up the fetch request if the component unmounts
        };
    }, [id, authTokens]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            total_investment: calculateTotalInvestment({
                ...prevData,
                [name]: value,
            }),
        }));
    };

    const calculateTotalInvestment = ({ quantity, share_price, brokerage_fees }) => {
        const qty = parseFloat(quantity) || 0;
        const price = parseFloat(share_price) || 0;
        const fees = parseFloat(brokerage_fees) || 0;
        return qty * price + fees;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
    
        const updatedData = {
            ...formData,
            owner: formData.owner.id,  // Only send the owner's ID
            quantity: parseFloat(formData.quantity),
            share_price: parseFloat(formData.share_price),
            new_share_price: parseFloat(formData.new_share_price),
            brokerage_fees: parseFloat(formData.brokerage_fees),
            total_investment: calculateTotalInvestment(formData)
        };
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/stocks/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`,
                },
                body: JSON.stringify(updatedData),
            });
    
            if (response.ok) {
                const result = await response.json();
                alert('Holding updated successfully!');
                setFormData(result);
                navigate('/index');
            } else {
                alert('Failed to update holding. Please try again.');
            }
        } catch (error) {
            console.error('Error updating holding:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this holding?')) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/stocks/${id}/`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${authTokens.access}`, // Include Authorization header
                    },
                });

                if (response.ok) {
                    alert('Holding deleted successfully!');
                    navigate('/index');
                } else {
                    alert('Failed to delete holding. Please try again.');
                }
            } catch (error) {
                console.error('Error deleting holding:', error);
                alert('An error occurred. Please try again.');
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="manage-holding-container">
            <h2>Manage Holding</h2>
            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label htmlFor="company_code">Company Code</label>
                    <input
                        type="text"
                        name="company_code"
                        value={formData.company_code}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="company_name">Company Name</label>
                    <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="trade_date">Trade Date</label>
                    <input
                        type="date"
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
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="share_price">Purchase Price</label>
                    <input
                        type="number"
                        name="share_price"
                        value={formData.share_price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="new_share_price">New Share Price</label>
                    <input
                        type="number"
                        name="new_share_price"
                        value={formData.new_share_price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="brokerage_fees">Brokerage Fees</label>
                    <input
                        type="number"
                        name="brokerage_fees"
                        value={formData.brokerage_fees}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Holding</button>
            </form>
            <button onClick={handleDelete} className="delete-button">Delete Holding</button>
        </div>
    );
};

export default ManageHolding;
