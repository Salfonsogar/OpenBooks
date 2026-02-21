import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
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
const AdminPage = lazy(() => import('../pages/Admin'));
const UploadBooks = lazy(() => import('../pages/UploadBooks'));
const Users = lazy(() => import('../pages/Users'));
const CategoriesPage = lazy(() => import('../pages/CategoriasPage'));
const ReportesPage = lazy(() => import('../pages/ReportesPage'));
const DenunciasPage = lazy(() => import('../pages/DenunciasPage'));
const SugerenciasPage = lazy(() => import('../pages/SugerenciasPage'));
const PenalizacionesPage = lazy(() => import('../pages/PenalizacionesPage'));
const MonitoreoLibrosPage = lazy(() => import('../pages/MonitoreoLibrosPage'));
const EditBook = lazy(() => import('../pages/EditBook'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export const publicRoutes = [
  {
    path: '/',
    element: <Catalog />,
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
    path: 'reportes',
    element: <ReportesPage />,
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
