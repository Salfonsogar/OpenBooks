import { Link } from "react-router-dom";

export default function Navbar() {
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
          OpeenBooks
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
              <Link className="nav-link text-white" to="/Catalog">
                Catálogo
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/Profile">
                Perfil
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/Library">
                Mi Biblioteca
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
