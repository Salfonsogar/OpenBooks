import "../../assets/styles/profileSidebar.css";

export default function ProfileSidebar({ activeView, setActiveView, onDelete }) {
  return (
    <div className="profile-nav">
      <div className="profile-nav__header">
        <i className="bi bi-sliders"></i>
        <span>Configuración</span>
      </div>

      <div className="profile-nav__section">
        <span className="profile-nav__label">General</span>
        
        <button
          className={`profile-nav__item ${activeView === "profile" ? "is-active" : ""}`}
          onClick={() => setActiveView("profile")}
        >
          <div className="profile-nav__icon">
            <i className="bi bi-person-circle"></i>
          </div>
          <div className="profile-nav__text">
            <span className="profile-nav__name">Editar Perfil</span>
            <span className="profile-nav__desc">Modifica tu información personal</span>
          </div>
          <i className="bi bi-chevron-right profile-nav__arrow"></i>
        </button>

        <button
          className={`profile-nav__item ${activeView === "changePassword" ? "is-active" : ""}`}
          onClick={() => setActiveView("changePassword")}
        >
          <div className="profile-nav__icon profile-nav__icon--warning">
            <i className="bi bi-shield-lock"></i>
          </div>
          <div className="profile-nav__text">
            <span className="profile-nav__name">Cambiar contraseña</span>
            <span className="profile-nav__desc">Mantén tu cuenta segura</span>
          </div>
          <i className="bi bi-chevron-right profile-nav__arrow"></i>
        </button>

        <button className="profile-nav__item" disabled>
          <div className="profile-nav__icon profile-nav__icon--info">
            <i className="bi bi-bell"></i>
          </div>
          <div className="profile-nav__text">
            <span className="profile-nav__name">Notificaciones</span>
            <span className="profile-nav__desc">Próximamente</span>
          </div>
        </button>

        <button className="profile-nav__item" disabled>
          <div className="profile-nav__icon profile-nav__icon--success">
            <i className="bi bi-globe"></i>
          </div>
          <div className="profile-nav__text">
            <span className="profile-nav__name">Idioma</span>
            <span className="profile-nav__desc">Español (Colombia)</span>
          </div>
        </button>
      </div>

      <div className="profile-nav__section profile-nav__section--danger">
        <span className="profile-nav__label">Cuenta</span>

        <button className="profile-nav__item profile-nav__item--danger" onClick={onDelete}>
          <div className="profile-nav__icon profile-nav__icon--danger">
            <i className="bi bi-trash"></i>
          </div>
          <div className="profile-nav__text">
            <span className="profile-nav__name">Eliminar Cuenta</span>
            <span className="profile-nav__desc">Acción irreversible</span>
          </div>
          <i className="bi bi-chevron-right profile-nav__arrow"></i>
        </button>
      </div>
    </div>
  );
}
