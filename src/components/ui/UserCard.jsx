import { Link } from "react-router-dom";
import "../../assets/styles/userCard.css";

export default function UserCard({ user, showSettingsButton = false }) {
  const getRoleBadgeColor = (role) => {
    const colors = {
      'Administrador': '#6e3b3b',
      'Usuario': '#1a5f90',
    };
    return colors[role] || '#777';
  };

  const avatar = user?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const name = user?.UserName || user?.Email || "Usuario";
  const email = user?.Email || "";
  const role = user?.Roles?.[0] || "Usuario";

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body text-center d-flex flex-column justify-content-between">
        <img
          src={avatar}
          alt={name}
          className="rounded-circle mb-3 mx-auto d-block"
          width="120"
          height="120"
          style={{ objectFit: 'cover' }}
        />
        <h4 className="fw-bold mb-1">{name}</h4>
        <p className="text-muted mb-3">{email}</p>
        <span
          className="badge mb-3 d-block mx-auto"
          style={{ 
            backgroundColor: getRoleBadgeColor(role), 
            color: '#fff' 
          }}
        >
          {role}
        </span>
        <div className="mt-3">
          <button className="btn-add-bookmark w-100 mb-2">
            Cambiar foto
          </button>
          {showSettingsButton && (
            <Link 
              to="/profile-settings"
              className="btn-add-bookmark w-100 text-decoration-none account-settings-btn d-inline-flex align-items-center justify-content-center"
            >
              <i className="bi bi-gear me-2"></i>
              Ajustes y privacidad
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
