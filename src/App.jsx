import React from 'react';
import { AuthProvider } from './components/AuthContext/AuthContext';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <h1>User Authentication</h1>
        <SignUp />
        <SignIn />
      </div>
    </AuthProvider>
  );
}

export default App;
