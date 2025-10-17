import { useState } from 'react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('datos');

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container">
        <div className="mb-4">
          <h1 className="display-5 fw-bold mb-2">Mi Perfil</h1>
          <p className="text-muted">
            Gestiona tu información personal y preferencias
          </p>
        </div>

        <div className="row g-4">
          {/* Sidebar con info personal */}
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <img
                  src="/diverse-user-avatars.png"
                  alt="Usuario"
                  className="rounded-circle mb-3"
                  width="120"
                  height="120"
                />
                <h4 className="fw-bold mb-1">María García</h4>
                <p className="text-muted mb-3">maria@ejemplo.com</p>
                <span className="badge bg-primary mb-3">Administrador</span>
                <button className="btn btn-outline-primary w-100">
                  Cambiar Foto
                </button>
              </div>
            </div>
          </div>

          {/* Contenido principal con tabs */}
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === 'datos' ? 'active' : ''
                      }`}
                      onClick={() => setActiveTab('datos')}
                    >
                      Datos
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === 'seguridad' ? 'active' : ''
                      }`}
                      onClick={() => setActiveTab('seguridad')}
                    >
                      Seguridad
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === 'actividad' ? 'active' : ''
                      }`}
                      onClick={() => setActiveTab('actividad')}
                    >
                      Actividad
                    </button>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                {/* Tab Datos */}
                {activeTab === 'datos' && (
                  <form>
                    <div className="mb-3">
                      <label htmlFor="nombre" className="form-label">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        defaultValue="María García"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        defaultValue="maria@ejemplo.com"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="bio" className="form-label">
                        Biografía
                      </label>
                      <textarea
                        className="form-control"
                        id="bio"
                        rows="3"
                        defaultValue="Amante de la literatura clásica y moderna. Administradora de la biblioteca digital."
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="intereses" className="form-label">
                        Intereses
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="intereses"
                        defaultValue="Literatura, Historia, Filosofía"
                      />
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                      <button type="button" className="btn btn-secondary">
                        Cancelar
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Guardar Cambios
                      </button>
                    </div>
                  </form>
                )}

                {/* Tab Seguridad */}
                {activeTab === 'seguridad' && (
                  <form>
                    <div className="mb-3">
                      <label htmlFor="current-password" className="form-label">
                        Contraseña Actual
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="current-password"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="new-password" className="form-label">
                        Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="new-password"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirm-password" className="form-label">
                        Confirmar Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirm-password"
                      />
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                      <button type="button" className="btn btn-secondary">
                        Cancelar
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Cambiar Contraseña
                      </button>
                    </div>
                  </form>
                )}

                {/* Tab Actividad */}
                {activeTab === 'actividad' && (
                  <div>
                    <div className="card mb-3">
                      <div className="card-body">
                        <h6 className="card-title mb-3">
                          Estadísticas de Lectura
                        </h6>
                        <div className="row text-center">
                          <div className="col-4">
                            <h3 className="fw-bold text-primary">24</h3>
                            <small className="text-muted">Libros Leídos</small>
                          </div>
                          <div className="col-4">
                            <h3 className="fw-bold text-primary">8</h3>
                            <small className="text-muted">En Progreso</small>
                          </div>
                          <div className="col-4">
                            <h3 className="fw-bold text-primary">156</h3>
                            <small className="text-muted">Horas Totales</small>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card mb-3">
                      <div className="card-body">
                        <h6 className="card-title mb-3">Libros Favoritos</h6>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span>Cien Años de Soledad</span>
                          <span className="badge bg-secondary">Ficción</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span>1984</span>
                          <span className="badge bg-secondary">Distopía</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span>El Principito</span>
                          <span className="badge bg-secondary">Clásico</span>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title mb-3">Actividad Reciente</h6>
                        <div className="mb-3">
                          <div className="d-flex align-items-start">
                            <span className="badge bg-primary rounded-circle p-1 me-2 mt-1"></span>
                            <div>
                              <p className="mb-0">
                                Completaste "El Alquimista"
                              </p>
                              <small className="text-muted">Hace 2 días</small>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="d-flex align-items-start">
                            <span className="badge bg-primary rounded-circle p-1 me-2 mt-1"></span>
                            <div>
                              <p className="mb-0">
                                Agregaste "Sapiens" a favoritos
                              </p>
                              <small className="text-muted">Hace 5 días</small>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="d-flex align-items-start">
                            <span className="badge bg-primary rounded-circle p-1 me-2 mt-1"></span>
                            <div>
                              <p className="mb-0">
                                Iniciaste "El Código Da Vinci"
                              </p>
                              <small className="text-muted">
                                Hace 1 semana
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
