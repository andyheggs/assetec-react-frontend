
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate(); 

    const handleSignUp = () => {
        navigate('/sign-up'); // Navigate to the sign-up page
    };

    const handleSignIn = () => {
        navigate('/sign-in'); // Navigate to the sign-in page
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
                <div className="nav-links">
                    <div className="nav-button signup-button" onClick={handleSignUp}>
                        Sign-up
                    </div>
                    <div className="nav-button signin-button" onClick={handleSignIn}>
                        Sign-in
                    </div>
                </div>
            </div>
            <div className="main-content">
                <div className="main-heading">
                    take your future into your own hands...
                </div>
                <div className="image-container">
                    <img 
                        src="https://res.cloudinary.com/dim47nr4g/image/upload/v1724831142/assetec-Landing_Page-Image_dief8l.png" 
                        alt="Investment visualization" 
                    />
                </div>
                <div className="sub-heading">
                    Sign-up to begin building your portfolio, track your investments and see the value of your assets.
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
