import React from 'react';
import { Navigate } from 'react-router-dom';

// Check if user data exists in local storage
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('users');

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
