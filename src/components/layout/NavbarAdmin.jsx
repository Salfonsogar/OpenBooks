
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

export default function NavbarAdmin() {
  const [showAccount, setShowAccount] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setShowAccount(false);
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#1a1a2e' }}>
      <div className="container-fluid">
        <a
          className="navbar-brand text-white"
          href="/"
          style={{ cursor: 'pointer' }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top me-2"
          />
          OpenBooks Admin
        </a>

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
              <Link
                className="nav-link text-white"
                to="/penalizacion-page"
              >
                <i className="fas fa-exclamation-triangle me-2"></i>
                Penalizaciones
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/reviews">
                <i className="fas fa-star me-2"></i>
                Reseñas
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-white"
                to="/denuncias"
              >
                <i className="fas fa-flag me-2"></i>
                Denuncias
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-white"
                to="/sugerencias"
              >
                <i className="fas fa-lightbulb me-2"></i>
                Sugerencias
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-white"
                to="/usuarios"
              >
                <i className="fas fa-users me-2"></i>
                Usuarios
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-white"
                to="/libros"
              >
                <i className="fas fa-book-open me-2"></i>
                Libros
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-white"
                to="/categorias"
              >
                <i className="fas fa-tags me-2"></i>
                Categorías
              </Link>
            </li>

            <li className="nav-item">
              <span
                className="nav-item nav-link text-white"
                style={{ cursor: "pointer" }}
                onClick={() => setShowAccount(!showAccount)}
              >
                <i className="fas fa-user-circle me-2"></i>
                Cuenta{" "}
                <i
                  className={`fa fa-angle-${showAccount ? "up" : "down"} ms-1`}
                  aria-hidden="true"
                ></i>
              </span>
            </li>

            {showAccount && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/profile"
                  >
                    <i className="fas fa-user-shield me-2"></i>
                    Mi perfil
                  </Link>
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
    </nav>
  );
}