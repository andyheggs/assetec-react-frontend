import React, { createContext, useState, useEffect } from 'react'; 

// Create a context for authentication
export const AuthContext = createContext();

// Provider component to wrap app with authentication context
export const AuthProvider = ({ children }) => {
  // State management for auth tokens, initialising from local storage if available
  const [authTokens, setAuthTokens] = useState(() => 
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );

  // State management for user data, decoding it from the auth tokens if available
  const [user, setUser] = useState(() => 
    authTokens ? JSON.parse(atob(authTokens.access.split('.')[1])) : null
  );

  // Function to handle user login
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
      setUser(JSON.parse(atob(data.access.split('.')[1])));
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

  // Function to handle user logout
  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
  };

  // Provide the authentication context to child components
  return (
    <AuthContext.Provider value={{ user, authTokens, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
