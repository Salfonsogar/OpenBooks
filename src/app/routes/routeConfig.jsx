import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser, selectIsAuthenticated } from '../../features/auth/store/authSlice';
import { selectAllRoles } from '../../features/auth/store/rolesSlice';

const Home = lazy(() => import('../../features/home/home-page/Home'));
const Catalog = lazy(() => import('../../features/books/pages/Catalog'));
const BookPage = lazy(() => import('../../features/books/pages/BookPage'));
const Library = lazy(() => import('../../features/books/pages/Library'));
const ProfilePage = lazy(() => import('../../features/user/pages/Profile'));
const ProfileSettings = lazy(() => import('../../features/user/pages/ProfileSettings'));
const ProfileForm = lazy(() => import('../../features/user/components/ProfileForm'));
const ChangePassword = lazy(() => import('../../features/user/components/ChangePassword'));
const AuthModal = lazy(() => import('../../features/auth/components/AuthModal'));
const ForgotPassword = lazy(() => import('../../features/auth/pages/ForgotPassword'));
const VerifyCode = lazy(() => import('../../features/auth/pages/VerifyCode'));
const ResetPassword = lazy(() => import('../../features/auth/pages/ResetPassword'));
const AdminPage = lazy(() => import('../../features/admin/pages/admin-page/Admin'));
const UploadBooks = lazy(() => import('../../features/admin/pages/UploadBooks'));
const Users = lazy(() => import('../../features/admin/pages/Users'));
const CategoriesPage = lazy(() => import('../../features/admin/pages/CategoriasPage'));
const DenunciasPage = lazy(() => import('../../features/admin/pages/DenunciasPage'));
const SugerenciasPage = lazy(() => import('../../features/admin/pages/SugerenciasPage'));
const PenalizacionesPage = lazy(() => import('../../features/admin/pages/PenalizacionesPage'));
const MonitoreoLibrosPage = lazy(() => import('../../features/admin/pages/MonitoreoLibrosPage'));
const EditBook = lazy(() => import('../../features/admin/pages/EditBook'));
const NotFoundPage = lazy(() => import('../../shared/pages/NotFoundPage'));

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
