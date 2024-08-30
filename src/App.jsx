
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './components/AuthContext/AuthContext';
import LandingPage from './components/Landing/LandingPage';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import UserIndexPage from './components/UserIndex/UserIndexPage';
import ManageHolding from './components/ManageHolding/ManageHolding';
import CreateHolding from './components/CreateHolding/CreateHolding';

function ProtectedRoute({ children }) {
    const { authTokens } = React.useContext(AuthContext);

    if (!authTokens) {
        return <Navigate to="/sign-in" replace />;
    }

    return children;
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route
                        path="/index"
                        element={
                            <ProtectedRoute>
                                <UserIndexPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/manage-holding/:id"
                        element={
                            <ProtectedRoute>
                                <ManageHolding />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/create-holding"
                        element={
                            <ProtectedRoute>
                                <CreateHolding />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
