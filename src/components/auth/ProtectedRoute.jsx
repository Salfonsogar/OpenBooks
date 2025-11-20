import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated, selectAuthUser } from '../../store/authSlice';

export default function ProtectedRoute({ children, requiredRoles = [] }) {
  const isAuth = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);

  if (!isAuth) return <Navigate to="/Login" replace />;

  if (requiredRoles && requiredRoles.length > 0) {
    // Asegura que roles sea un array y compara sin importar mayúsculas/minúsculas
    const roles = (user && (user.roles || user.Roles)) || [];
    const ok = roles.some((r) =>
      requiredRoles.some((req) =>
        String(r).toLowerCase().trim() === String(req).toLowerCase().trim()
      )
    );
    if (!ok) return <Navigate to="/" replace />;
  }

  return children;
}
