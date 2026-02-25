import { Suspense, useEffect, useMemo } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRolesAsync, selectAllRoles } from './store/rolesSlice';
import { selectAuthUser, selectIsAuthenticated } from './store/authSlice';
import { selectReaderBookId } from './store/readerSlice';
import Navbar from './components/layout/Navbar';
import NavbarAdmin from './components/layout/NavbarAdmin';
import AdminNotifications from './components/admin/AdminNotifications';
import Reader from './reader/Reader';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { publicRoutes, protectedRoutes, adminRoutes } from './routes/routeConfig';

const LoadingFallback = () => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
  </div>
);

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const roles = useSelector(selectAllRoles);
  const readerBookId = useSelector(selectReaderBookId);

  useEffect(() => {
    dispatch(fetchRolesAsync());
  }, [dispatch]);

  const isAdmin = useMemo(() => {
    if (!user || !user.rolId || !roles.length) return false;
    const userRole = roles.find(r => r.id === user.rolId);
    return userRole && (userRole.name === 'Administrador' || userRole.name === 'Admin');
  }, [user, roles]);

  // Si es admin y está autenticado, mostrar siempre el navbar de admin
  const showAdminNavbar = isAuthenticated && isAdmin;

  return (
    <>
      {readerBookId && <Reader />}
      {showAdminNavbar ? <NavbarAdmin /> : <Navbar />}
      {showAdminNavbar && <AdminNotifications />}
      <Suspense fallback={<LoadingFallback />}>
        <main>
          <Routes>
            {/* Rutas públicas */}
            {publicRoutes.map((route, index) => (
              <Route
                key={`public-${index}`}
                path={route.path}
                element={route.element}
              />
            ))}

            {/* Rutas protegidas - usuarios autenticados */}
            {protectedRoutes.map((route, index) => (
              <Route
                key={`protected-${index}`}
                path={route.path}
                element={
                  <ProtectedRoute>
                    {route.element}
                  </ProtectedRoute>
                }
              />
            ))}

            {/* Rutas de admin */}
            {adminRoutes.map((route, index) => (
              <Route
                key={`admin-${index}`}
                path={route.path}
                element={
                  <ProtectedRoute requiredRoles={['Administrador', 'Admin']}>
                    {route.element}
                  </ProtectedRoute>
                }
              />
            ))}
          </Routes>
        </main>
      </Suspense>
    </>
  );
}

export default App;
