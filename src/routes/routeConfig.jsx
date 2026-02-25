import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser, selectIsAuthenticated } from '../store/authSlice';
import { selectAllRoles } from '../store/rolesSlice';

const Home = lazy(() => import('../pages/HomePage/Home'));
const Catalog = lazy(() => import('../pages/Catalog'));
const BookPage = lazy(() => import('../pages/BookPage'));
const Library = lazy(() => import('../pages/Library'));
const ProfilePage = lazy(() => import('../pages/Profile'));
const ProfileSettings = lazy(() => import('../pages/ProfileSettings'));
const ProfileForm = lazy(() => import('../components/profile/ProfileForm'));
const ChangePassword = lazy(() => import('../components/profile/ChangePassword'));
const AuthModal = lazy(() => import('../components/auth/AuthModal'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const VerifyCode = lazy(() => import('../pages/VerifyCode'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));
const AdminPage = lazy(() => import('../pages/AdminPage/Admin'));
const UploadBooks = lazy(() => import('../pages/UploadBooks'));
const Users = lazy(() => import('../pages/Users'));
const CategoriesPage = lazy(() => import('../pages/CategoriasPage'));
const DenunciasPage = lazy(() => import('../pages/DenunciasPage'));
const SugerenciasPage = lazy(() => import('../pages/SugerenciasPage'));
const PenalizacionesPage = lazy(() => import('../pages/PenalizacionesPage'));
const MonitoreoLibrosPage = lazy(() => import('../pages/MonitoreoLibrosPage'));
const EditBook = lazy(() => import('../pages/EditBook'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

function HomeRedirect() {
  const user = useSelector(selectAuthUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const roles = useSelector(selectAllRoles);

  const isAdmin = () => {
    if (!user || !user.rolId || !roles.length) return false;
    const userRole = roles.find(r => r.id === user.rolId);
    return userRole && (userRole.name === 'Administrador' || userRole.name === 'Admin');
  };

  if (!isAuthenticated) {
    return <Navigate to="/catalog" replace />;
  }

  if (isAdmin()) {
    return <Navigate to="/Admin" replace />;
  }

  return <Navigate to="/home" replace />;
}

export const publicRoutes = [
  {
    path: '/',
    element: <HomeRedirect />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: 'catalog',
    element: <Catalog />,
  },
  {
    path: 'book/:id',
    element: <BookPage />,
  },
  {
    path: 'Login',
    element: <AuthModal />,
  },
  {
    path: 'forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: 'verify-code',
    element: <VerifyCode />,
  },
  {
    path: 'reset-password',
    element: <ResetPassword />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export const protectedRoutes = [
  {
    path: 'library',
    element: <Library />,
  },
  {
    path: 'profile',
    element: <ProfilePage />,
  },
  {
    path: 'profile-settings',
    element: <ProfileSettings />,
  },
  {
    path: 'profile-form',
    element: <ProfileForm />,
  },
  {
    path: 'change-password',
    element: <ChangePassword />,
  },
];

export const adminRoutes = [
  {
    path: 'Admin',
    element: <AdminPage />,
  },
  {
    path: 'Upload',
    element: <UploadBooks />,
  },
  {
    path: 'usuarios',
    element: <Users />,
  },
  {
    path: 'categorias',
    element: <CategoriesPage />,
  },
  {
    path: 'denuncias',
    element: <DenunciasPage />,
  },
  {
    path: 'sugerencias',
    element: <SugerenciasPage />,
  },
  {
    path: 'penalizacion-page',
    element: <PenalizacionesPage />,
  },
  {
    path: 'libros',
    element: <MonitoreoLibrosPage />,
  },
  {
    path: 'libros/editar/:id',
    element: <EditBook />,
  },
];
