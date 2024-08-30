import React, { createContext, useState, useEffect } from 'react'; 

// Create a context for authentication
export const AuthContext = createContext();

// Provider component to wrap app with authentication context
export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => 
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );

  const [user, setUser] = useState(() => 
    authTokens ? JSON.parse(atob(authTokens.access.split('.')[1])) : null
  );

  useEffect(() => {
    if (authTokens) {
      const decodedToken = JSON.parse(atob(authTokens.access.split('.')[1]));
      setUser({
        ...decodedToken,
        profile_image: decodedToken.profile_image || '/path/to/default/profile/image.png', // Fallback to a default image
      });
    }
  }, [authTokens]);

  const login = async (username, password) => {
    const response = await fetch('/auth/sign-in/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      const data = await response.json();
      setAuthTokens(data);
      setUser({
        ...JSON.parse(atob(data.access.split('.')[1])),
        profile_image: JSON.parse(atob(data.access.split('.')[1])).profile_image || '/path/to/default/profile/image.png', // Fallback to a default image
      });
      localStorage.setItem('authTokens', JSON.stringify(data));
    } else {
      console.error('Login failed');
    }
  };
  
  const signUp = async (userData) => {
    const response = await fetch('/auth/sign-up/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  
    if (response.ok) {
      const data = await response.json();
      console.log('SignUp successful:', data);
      return true;
    } else {
      console.error('SignUp failed');
      return false;
    }
  };

  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
  };

  return (
    <AuthContext.Provider value={{ user, authTokens, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


