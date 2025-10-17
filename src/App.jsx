import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Library from './pages/Library';
import AuthModal from './components/ui/AuthModal';
import UploadBooksPage from './pages/UploadBooks';
import ProfilePage from './pages/Profile';
import AdminPage from './pages/Admin';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Catalog" element={<Catalog />} />
          <Route path="/Library" element={<Library />} />
          <Route path="/Login" element={<AuthModal />} />
          <Route path="/Upload" element={<UploadBooksPage />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/Admin" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
