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
          <Route path="/Library" element={<Library />} />
          <Route path="/Login" element={<AuthModal onClose={()=> navigate('/')} />} />
          <Route path="/Upload" element={<UploadBooksPage />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/Admin" element={<AdminPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/profile-form" element={<ProfileForm/>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
