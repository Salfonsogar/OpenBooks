import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import AuthModal from "../auth/AuthModal";
import "../../assets/styles/Navbar.css";
import user from "../../assets/icons/user.svg";
import shieldUser from "../../assets/icons/shield-user.svg";
import circleUser from "../../assets/icons/circle-user.svg";
import library from "../../assets/icons/library.svg";
import bookUser from "../../assets/icons/book-user.svg";

export default function Navbar() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setShowAccount(false);
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top me-2"
          />
          OpenBooks
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/catalog">
                <img src={library} alt="catalog icon" />
                Catálogo
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/library">
                <img src={bookUser} alt="library icon" />
                Mi Biblioteca
              </Link>
            </li>
            <li className="nav-item">
              <span
                className="nav-item nav-link text-white"
                style={{ cursor: "pointer" }}
                onClick={() => setShowAccount(!showAccount)}
              >
                <img src={user} alt="user icon" />
                Cuentas{" "}
                <i
                  className={`fa fa-angle-${showAccount ? "up" : "down"} ms-1`}
                  aria-hidden="true"
                ></i>
              </span>
            </li>
            {showAccount && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/profile">
                    <img src={shieldUser} alt="profile icon" />
                    Mi perfil
                  </Link>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-item nav-link text-white"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowAuthModal(true)}
                  >
                    <img src={circleUser} alt="login icon" />
                    Login/Register
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link text-white btn btn-link text-decoration-none"
                    onClick={handleLogout}
                    style={{ background: 'none', border: 'none' }}
                  >
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </nav>
  );
}
