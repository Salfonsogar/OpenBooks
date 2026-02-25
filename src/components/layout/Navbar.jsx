import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { selectAuthUser, selectIsAuthenticated } from "../../store/authSlice";
import { selectAllRoles } from "../../store/rolesSlice";
import AuthModal from "../auth/AuthModal";
import "../../assets/styles/Navbar.css";
import user from "../../assets/icons/user.svg";
import shieldUser from "../../assets/icons/shield-user.svg";
import circleUser from "../../assets/icons/circle-user.svg";
import library from "../../assets/icons/library.svg";
import bookUser from "../../assets/icons/book-user.svg";

const CaretDown = ({ open }) => (
  <svg
    className={`dropdown-caret${open ? " open" : ""}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Navbar() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(selectAuthUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const roles = useSelector(selectAllRoles);
  const dropdownRef = useRef(null);

  const isAdmin = () => {
    if (!userData || !userData.rolId || !roles.length) return false;
    const userRole = roles.find((r) => r.id === userData.rolId);
    return userRole && (userRole.name === "Administrador" || userRole.name === "Admin");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setShowAccount(false);
  };

  // Track viewport width
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 991);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close dropdown on outside click (desktop only)
  useEffect(() => {
    if (isMobile) { setShowAccount(false); return; }
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowAccount(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMobile]);

  const homePath = !isAuthenticated ? "/catalog" : (isAdmin() ? "/Admin" : "/home");

  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          {/* Brand */}
          <Link className="navbar-brand" to={homePath}>
            <span className="navbar-brand-icon">
              <img src="https://cdn-icons-png.flaticon.com/512/29/29302.png" alt="Logo" />
            </span>
            OpenBooks
          </Link>

          {/* Hamburger */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowAccount(false)} /* close dropdown when opening mobile menu */
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-1">

              {/* Catalog */}
              <li className="nav-item">
                <Link className="nav-link" to="/catalog">
                  Catálogo
                </Link>
              </li>

              {/* Library */}
              <li className="nav-item">
                <Link className="nav-link" to="/library">
                  Mi Biblioteca
                </Link>
              </li>

              {/* ── DESKTOP: separator + dropdown ── */}
              {!isMobile && (
                <>
                  <li className="nav-item">
                    <span className="nav-separator" role="separator" aria-hidden="true" />
                  </li>

                  <li className="nav-item dropdown" ref={dropdownRef}>
                    <button
                      className="nav-link dropdown-toggle-btn"
                      onClick={() => setShowAccount((p) => !p)}
                      aria-haspopup="true"
                      aria-expanded={showAccount}
                    >
                      <img src={user} alt="" aria-hidden="true" />
                      Mi Cuenta
                      <CaretDown open={showAccount} />
                    </button>

                    <ul className={`dropdown-menu dropdown-menu-end${showAccount ? " show" : ""}`}>
                      <li className="dropdown-header">Mi cuenta</li>
                      <li>
                        <Link className="dropdown-item" to="/profile" onClick={() => setShowAccount(false)}>
                          <img src={shieldUser} alt="" aria-hidden="true" />
                          Mi perfil
                        </Link>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      {!isAuthenticated ? (
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => { setShowAccount(false); setShowAuthModal(true); }}
                          >
                            <img src={circleUser} alt="" aria-hidden="true" />
                            Login / Registrarse
                          </button>
                        </li>
                      ) : (
                        <li>
                          <button className="dropdown-item logout-item" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt"></i>
                            Cerrar sesión
                          </button>
                        </li>
                      )}
                    </ul>
                  </li>
                </>
              )}

              {/* ── MOBILE: flat account items inline ── */}
              {isMobile && (
                <>
                  <li className="nav-item">
                    <span className="mobile-section-label">Mi cuenta</span>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      <img src={shieldUser} alt="" aria-hidden="true" />
                      Mi perfil
                    </Link>
                  </li>
                  {!isAuthenticated ? (
                    <li className="nav-item">
                      <button
                        className="nav-link mobile-logout"
                        onClick={() => setShowAuthModal(true)}
                        style={{ width: "100%", border: "none", background: "none", fontFamily: "inherit" }}
                      >
                        <img src={circleUser} alt="" aria-hidden="true" />
                        Login / Registrarse
                      </button>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <button
                        className="nav-link mobile-logout"
                        onClick={handleLogout}
                        style={{ width: "100%", border: "none", background: "none", fontFamily: "inherit" }}
                      >
                        <i className="fas fa-sign-out-alt"></i>
                        Cerrar sesión
                      </button>
                    </li>
                  )}
                </>
              )}

            </ul>
          </div>
        </div>
      </nav>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}