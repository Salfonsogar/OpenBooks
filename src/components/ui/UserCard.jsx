import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthUser } from '../../store/authSlice';
import { selectAllRoles } from '../../store/rolesSlice';
import "../../assets/styles/userCard.css";

export default function UserCard({ showSettingsButton = false }) {
  const user = useSelector(selectAuthUser);
  const roles = useSelector(selectAllRoles);

  const getRoleBadgeColor = (role) => {
    const colors = {
      'Administrador': '#1a5f90',
      'Usuario': '#3073dfff',
    };
    return colors[role] || '#777';
  };

  const avatar = user?.fotoPerfil
    ? `data:image/jpeg;base64,${user.fotoPerfil}`
    : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  console.log("UserCard - user:", user);
  console.log("UserCard - fotoPerfil:", user?.fotoPerfil);
  console.log("UserCard - avatar:", avatar);

  const name = user?.userName || user?.email || "userExample";
  const email = user?.email || "example@gmail.com";

  const userRoleObj = roles.find(r => r.id === user?.rolId);
  const role = userRoleObj?.name || "Cargando...";

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
          <button className="btn btn-main w-100 mb-2">
            Cambiar foto
          </button>
          {showSettingsButton && (
            <Link
              to="/profile-settings"
              className="btn btn-outline-main w-100 text-decoration-none account-settings-btn d-inline-flex align-items-center justify-content-center"
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
