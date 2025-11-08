import "../../assets/styles/userCard.css";

export default function UserCard({ 
  imgSrc, 
  name, 
  email, 
  role,
  showSettingsButton = false 
}) {
  const getRoleBadgeColor = (role) => {
    const colors = {
      'Admin': '#6e3b3b',
      'Usuario': '#1a5f90',
    };
    return colors[role] || '#777';
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body text-center space-between d-flex flex-column">
        <img
          src={imgSrc}
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
            <a href="/account-settings" className="btn-add-bookmark w-100 text-decoration-none account-settings-btn">
              <i className="bi bi-gear me-2"></i>
              Ajustes y privacidad
            </a>
          )}
        </div>
      </div>
    </div>
  );
}