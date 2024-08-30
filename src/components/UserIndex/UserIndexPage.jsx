import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import TopPerformers from './TopPerformers/TopPerformers';
import PortfolioOverview from './PortfolioOverview/PortfolioOverview';
import InvestmentHoldings from './InvestmentHoldings/InvestmentHoldings';
import './UserIndexPage.css';

const UserIndexPage = () => {
  const { authTokens, logout, user } = useContext(AuthContext); // Extract user from AuthContext
  const [holdings, setHoldings] = useState([]);
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchHoldingsAndPortfolio = async () => {
    try {
      const holdingsResponse = await fetch('http://127.0.0.1:8000/stocks/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access}`,
        },
      });

      if (holdingsResponse.ok) {
        const holdingsData = await holdingsResponse.json();
        setHoldings(holdingsData);
      } else {
        console.error('Failed to fetch holdings');
      }

      const portfolioResponse = await fetch('http://127.0.0.1:8000/stocks/overview/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access}`,
        },
      });

      if (portfolioResponse.ok) {
        const portfolioData = await portfolioResponse.json();
        setPortfolio(portfolioData);
      } else {
        console.error('Failed to fetch portfolio data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoldingsAndPortfolio();
  }, [authTokens]);

  const refreshPortfolio = () => {
    fetchHoldingsAndPortfolio();
  };

  const handleSignOut = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/sign-in'); // Redirect to sign-in page
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  
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
      <div className="user-index-page">
        <div className="top-performers-container">
          <TopPerformers holdings={holdings} />
        </div>
        <div className="right-containers">
          <div className="portfolio-overview-container">
            <PortfolioOverview portfolio={portfolio} />
          </div>
          <div className="investment-holdings-container">
            <InvestmentHoldings holdings={holdings} refreshPortfolio={refreshPortfolio} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserIndexPage;
