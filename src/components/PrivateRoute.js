import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, children, element }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return element ? element : children ? children : <Outlet />;
};

export default PrivateRoute;