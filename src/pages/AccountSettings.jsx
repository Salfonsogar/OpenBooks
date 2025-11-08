import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DeleteAccountModal from '../components/ui/DeleteAccountModal';

export default function AccountSettings() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDeleteAccount = () => {
    console.log('Cuenta eliminada');
    alert('Cuenta eliminada correctamente');
    navigate('/login');
  };

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container" style={{ maxWidth: "900px" }}>
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/profile" className="text-decoration-none">
                <i className="bi bi-arrow-left me-1"></i>
                Perfil
              </a>
            </li>
            <li className="breadcrumb-item active">Ajustes y privacidad</li>
          </ol>
        </nav>
        <div className="mb-4">
          <h1 className="display-5 fw-bold mb-2">Ajustes y privacidad</h1>
        </div>

        <div className="row g-4">
          <div className="col-md-8">
            <div className="card shadow-sm mb-3">
              <div className="card-header bg-white">
                <h5 className="mb-0">
                  <i className="bi bi-gear me-2"></i>
                  Configuración General
                </h5>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  <Link to="/forgot-password" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    <div>
                      <i className="bi bi-lock me-2"></i>
                      <strong>Cambiar Contraseña</strong>
                      <p className="text-muted mb-0 small">Actualiza tu contraseña regularmente para mantener tu cuenta segura</p>
                    </div>
                    <i className="bi bi-chevron-right"></i>
                  </Link>

                  <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    <div>
                      <i className="bi bi-shield-check me-2"></i>
                      <strong>Editar perfil</strong>
                      <p className="text-muted mb-0 small">Cambia tu información personal</p>
                    </div>
                    <i className="bi bi-chevron-right"></i>
                  </button>

                  <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    <div>
                      <i className="bi bi-globe me-2"></i>
                      <strong>Idioma y región</strong>
                      <p className="text-muted mb-0 small">Español (Colombia)</p>
                    </div>
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0 text-danger">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Estado de cuenta
                </h5>
              </div>
              <div className="card-body">
                <div className="alert alert-warning">
                  <i className="bi bi-info-circle me-2"></i>
                  <strong>Advertencia:</strong> Las siguientes acciones son permanentes y no se pueden deshacer fácilmente.
                </div>

                <div className="mb-3 p-3 border rounded">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">
                        <i className="bi bi-pause-circle me-2"></i>
                        Desactivar cuenta
                      </h6>
                      <p className="text-muted small mb-0">
                        Tu cuenta será ocultada temporalmente
                      </p>
                    </div>
                    <button className="button">
                      Desactivar
                    </button>
                  </div>
                </div>

                <div className="p-3 border border-danger rounded">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1 text-danger">
                        <i className="bi bi-trash me-2"></i>
                        Eliminar cuenta permanentemente
                      </h6>
                      <p className="text-muted small mb-0">
                        Esta acción no se puede deshacer
                      </p>
                    </div>
                    <button 
                      className="btn btn-danger"
                      onClick={() => setShowModal(true)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal de confirmación */}
        {showModal && (
          <DeleteAccountModal
            onClose={() => setShowModal(false)}
            onConfirm={handleDeleteAccount}
          />
        )}
      </div>
    </div>
  );
}