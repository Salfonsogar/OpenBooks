import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Library from "./pages/Library";
import AuthModal from "./components/ui/AuthModal";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/Library" element={<Library />} />
        <Route path="/Login" element={<AuthModal />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
