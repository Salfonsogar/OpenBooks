import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Navbar from './components/layout/Navbar';
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
function App() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/Catalog" element={<Catalog />} />
          <Route path="/Library" element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          } />
          <Route path="/Login" element={<AuthModal onClose={()=> navigate('/')} />} />
          <Route path="/Upload" element={
            <ProtectedRoute requiredRoles={['Administrador']}>
              <UploadBooksPage />
            </ProtectedRoute>
          } />
          <Route path="/Profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/Admin" element={
            <ProtectedRoute requiredRoles={['Administrador']}>
              <AdminPage />
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
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
