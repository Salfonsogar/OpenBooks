import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import "../../assets/styles/Navbar.css";
import user from "../../assets/icons/user.svg";
import shieldUser from "../../assets/icons/shield-user.svg";

const adminMenuItems = [
  { path: "/penalizacion-page", icon: "fa-exclamation-triangle", label: "Penalizaciones" },
  { path: "/denuncias", icon: "fa-flag", label: "Denuncias" },
  { path: "/sugerencias", icon: "fa-lightbulb", label: "Sugerencias" },
  { path: "/usuarios", icon: "fa-users", label: "Usuarios" },
  { path: "/libros", icon: "fa-book-open", label: "Libros" },
  { path: "/categorias", icon: "fa-tags", label: "Categorías" },
];

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

export default function NavbarAdmin() {
  const [showAccount, setShowAccount] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setShowAccount(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setShowAccount(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-admin">
      <div className="container-fluid">

        {/* ── Brand ── */}
        <Link className="navbar-brand" to="/Admin">
          <span className="navbar-brand-icon">
            <img src="https://cdn-icons-png.flaticon.com/512/29/29302.png" alt="Logo" />
          </span>
          OpenBooks
          <span className="admin-badge">Admin</span>
        </Link>

        {/*
          RIGHT SIDE: always visible — Mi Cuenta dropdown + hamburger
          The hamburger only controls the nav links collapse, NOT Mi Cuenta.
        */}
        <div className="navbar-admin-right">

          {/* Mi Cuenta — always visible, never collapses */}
          <div className="dropdown admin-account" ref={dropdownRef}>
            <button
              className="nav-link dropdown-toggle-btn"
              onClick={() => setShowAccount((p) => !p)}
              aria-haspopup="true"
              aria-expanded={showAccount}
            >
              <img src={user} alt="" aria-hidden="true" />
              <span className="admin-account-label">Mi Cuenta</span>
              <CaretDown open={showAccount} />
            </button>

            <ul className={`dropdown-menu dropdown-menu-end${showAccount ? " show" : ""}`}>
              <li className="dropdown-header">Administrador</li>
              <li>
                <Link className="dropdown-item" to="/profile" onClick={() => setShowAccount(false)}>
                  <img src={shieldUser} alt="" aria-hidden="true" />
                  Mi perfil
                </Link>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item logout-item" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
          {/* ── Collapsible nav links ── */}
          <div className="collapse navbar-collapse" id="adminNavLinks">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-1">
              {adminMenuItems.map((item) => (
                <li className="nav-item" key={item.path}>
                  <Link
                    className={`nav-link sm${location.pathname === item.path ? " active" : ""}`}
                    to={item.path}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Hamburger — only toggles the nav links */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminNavLinks"
            aria-controls="adminNavLinks"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </nav>
  );
}