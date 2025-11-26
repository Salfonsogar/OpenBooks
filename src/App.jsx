import { useEffect, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Navbar from './components/layout/Navbar';
import NavbarAdmin from './components/layout/NavbarAdmin';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthUser } from './store/authSlice';
import { fetchRolesAsync, selectAllRoles } from './store/rolesSlice';
import Footer from './components/layout/Footer';
import Library from './pages/Library';
import AuthModal from './components/auth/AuthModal.jsx';
import UploadBooksPage from './pages/UploadBooks';
import ProfilePage from './pages/Profile';
import AdminPage from './pages/Admin';
import ForgotPassword from './pages/ForgotPassword';
import VerifyCode from './pages/VerifyCode';
import ResetPassword from './pages/ResetPassword';
import ProfileSettings from './pages/ProfileSettings.jsx';
import ProfileForm from './components/profile/ProfileForm.jsx';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import PenalizacionesPage from './pages/PenalizacionesPage.jsx';
import ReportesPage from './pages/ReportesPage.jsx';
import DenunciasPage from './pages/DenunciasPage.jsx';
import SugerenciasPage from './pages/SugerenciasPage.jsx';
import MonitoreoLibrosPage from './pages/MonitoreoLibrosPage.jsx';
import Users from './pages/Users.jsx';
import BookPage from './pages/BookPage.jsx';
import CategoriasPage from './pages/CategoriasPage.jsx';
// import AdminReviews from './pages/AdminReviews.jsx';
import EditBook from './pages/EditBook.jsx';
import AdminNotifications from './components/admin/AdminNotifications.jsx';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const roles = useSelector(selectAllRoles);

  useEffect(() => {
    dispatch(fetchRolesAsync());
  }, [dispatch]);

  const isAdmin = useMemo(() => {
    if (!user || !user.rolId || !roles.length) return false;
    const userRole = roles.find(r => r.id === user.rolId);
    return userRole && (userRole.name === 'Administrador' || userRole.name === 'Admin');
  }, [user, roles]);

  return (
    <>
      {isAdmin ? <NavbarAdmin /> : <Navbar />}
      {isAdmin && <AdminNotifications />}
      <main>
        <Routes>
          <Route path="/" element={isAdmin ? <AdminPage /> : <Home />} />
          <Route path="/Admin" element={
            <ProtectedRoute requiredRoles={['Administrador']}>
              <AdminPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/library" element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          } />
          <Route path="/Login" element={<AuthModal onClose={() => navigate('/')} />} />
          <Route path="/Upload" element={<ProtectedRoute requiredRoles={['Administrador']}><UploadBooksPage /></ProtectedRoute>} />
          <Route path="/penalizacion-page" element={<ProtectedRoute requiredRoles={['Administrador']}><PenalizacionesPage /></ProtectedRoute>} />
          <Route path="/reportes" element={
            <ProtectedRoute requiredRoles={['Administrador']}>
              <ReportesPage />
            </ProtectedRoute>
          } />
          <Route path="/denuncias" element={
            <ProtectedRoute requiredRoles={['Administrador']}>
              <DenunciasPage />
            </ProtectedRoute>
          } />
          <Route path="/sugerencias" element={
            <ProtectedRoute requiredRoles={['Administrador']}>
              <SugerenciasPage />
            </ProtectedRoute>
          } />
          <Route path="/libros" element={
            <ProtectedRoute requiredRoles={['Administrador']}>
              <MonitoreoLibrosPage />
            </ProtectedRoute>
          } />
          <Route path="/libros/editar/:id" element={
            <ProtectedRoute requiredRoles={['Administrador']}>
              <EditBook />
            </ProtectedRoute>
          } />
          <Route path="/categorias" element={
            <ProtectedRoute requiredRoles={['Administrador']}>
              <CategoriasPage />
            </ProtectedRoute>
          } />
          <Route path="/usuarios" element={
            <ProtectedRoute requiredRoles={['Administrador']}>
              <Users />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile-settings" element={
            <ProtectedRoute>
              <ProfileSettings />
            </ProtectedRoute>
          } />
          <Route path="/profile-form" element={
            <ProtectedRoute>
              <ProfileForm />
            </ProtectedRoute>
          } />
          <Route path="/book/:id" element={<BookPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
