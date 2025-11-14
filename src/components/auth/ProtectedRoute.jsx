import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated, selectAuthUser } from '../../store/authSlice';

export default function ProtectedRoute({ children, requiredRoles = [] }) {
  const isAuth = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);

  if (!isAuth) return <Navigate to="/Login" replace />;

  if (requiredRoles && requiredRoles.length > 0) {
    const roles = (user && user.Roles) || [];
    const ok = roles.some((r) => requiredRoles.includes(r));
    if (!ok) return <Navigate to="/" replace />;
  }

  return children;
}
