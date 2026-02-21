import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated, selectAuthUser } from '../../store/authSlice';
import { selectAllRoles } from '../../store/rolesSlice';

export default function ProtectedRoute({ children, requiredRoles = [] }) {
  const isAuth = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);
  const roles = useSelector(selectAllRoles);

  if (!isAuth) return <Navigate to="/Login" replace />;

  if (requiredRoles && requiredRoles.length > 0) {
    const userRoleObj = roles.find(r => r.id === user?.rolId);
    const userRoleName = userRoleObj?.name;

    const ok = userRoleName && requiredRoles.some((req) =>
      String(req).toLowerCase().trim() === String(userRoleName).toLowerCase().trim()
    );

    if (!ok) return <Navigate to="/" replace />;
  }

  return children;
}
