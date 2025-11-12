import "../../assets/styles/profileSidebar.css";

export default function ProfileSidebar({ activeView, setActiveView, onDelete }) {
  return (
    <div className="card shadow-sm" style={{ 
      top: '0',
      position: "sticky",
      height: "100vh",
      overflowY: "auto",
      borderRadius: "0.75rem",
     }}>
      <div
        className="card-header"
      >
        <h5 className="mb-0">
          <i className="bi bi-list-ul me-2"></i>
          Configuración
        </h5>
      </div>

      <div className="list-group list-group-flush">
        <div className="list-group-item bg-light py-2">
          <small className="text-muted fw-bold text-uppercase">
            <i className="bi bi-gear me-2"></i>
            Configuracion general
          </small>
        </div>

        <button
          className={`list-group-item list-group-item-action ${activeView === "profile" ? "active" : ""}`}
          onClick={() => setActiveView("profile")}
        >
          <div className="d-flex align-items-center">
            <i className="bi bi-person-circle fs-4 me-3 text-primary"></i>
            <div className="flex-grow-1">
              <div className="fw-bold">Editar Perfil</div>
              <small className="text-muted">Modifica tu información personal</small>
            </div>
          </div>
        </button>

        <button
          className={`list-group-item list-group-item-action ${activeView === "changePassword" ? "active" : ""}`}
          onClick={() => setActiveView("changePassword")}
        >
          <div className="d-flex align-items-center">
            <i className="bi bi-shield-lock fs-4 me-3 text-warning"></i>
            <div className="flex-grow-1">
              <div className="fw-bold">Cambiar contraseña</div>
              <small className="text-muted">Mantén tu cuenta segura con una contraseña fuerte</small>
            </div>
          </div>
        </button>

        <button className="list-group-item list-group-item-action" disabled>
          <div className="d-flex align-items-center">
            <i className="bi bi-bell fs-4 me-3 text-info"></i>
            <div className="flex-grow-1">
              <div className="fw-bold">Notificaciones</div>
              <small className="text-muted">Próximamente</small>
            </div>
          </div>
        </button>

        <button className="list-group-item list-group-item-action" disabled>
          <div className="d-flex align-items-center">
            <i className="bi bi-globe fs-4 me-3 text-success"></i>
            <div className="flex-grow-1">
              <div className="fw-bold">Idioma</div>
              <small className="text-muted">Español (Colombia)</small>
            </div>
          </div>
        </button>

        <div className="list-group-item bg-danger bg-opacity-10 py-2 border-top border-danger">
          <small className="text-danger fw-bold text-uppercase">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            Cuenta
          </small>
        </div>

        <button className="list-group-item list-group-item-action border-bottom" onClick={onDelete}>
          <div className="d-flex align-items-center">
            <i className="bi bi-trash fs-4 me-3 text-danger"></i>
            <div className="flex-grow-1">
              <div className="fw-bold text-danger">Eliminar Cuenta</div>
              <small className="text-muted">Acción irreversible, eliminaras tu cuenta permanentemente</small>
            </div>
            <i className="bi bi-chevron-right text-danger"></i>
          </div>
        </button>
      </div>
    </div>
  );
}
