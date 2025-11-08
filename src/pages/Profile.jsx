import { useState } from 'react';
import UserCard from '../components/ui/UserCard';

const mockUserData = {
  nombre: "María García",
  email: "maria@example.com",
  role: "Usuario",
  avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  bio: "Amante de la literatura clásica y moderna. Administradora de la biblioteca digital.",
  intereses: "Literatura, Historia, Filosofía",
  librosLeidos: 24,
  enProgreso: 8,
  horasTotales: 156
};

const mockPenalties = [
  { id: 1, motivo: "Comentario ofencivo en foro grupal", fecha: "2025-09-20", estado: "Activa" },
  { id: 2, motivo: "Homoxesualidad detectada, eres gei 🏳️‍🌈?", fecha: "2025-08-15", estado: "calajo" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('actividad');
  /* const [formData, setFormData] = useState({
    nombre: mockUserData.nombre,
    email: mockUserData.email,
    bio: mockUserData.bio,
    intereses: mockUserData.intereses
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Guardando datos:', formData);
    alert('Datos guardados correctamente');
  }; */

  const activePenaltiesCount = mockPenalties.filter(p => p.estado === 'Activa').length;

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container">
        
        <div className="mb-4">
          <h1 className="display-5 fw-bold mb-2">Mi Perfil</h1>
        </div>

        <div className="row g-4">
          
          <div className="col-lg-4">
            <UserCard
              imgSrc={mockUserData.avatar}
              name={mockUserData.nombre}
              email={mockUserData.email}
              role={mockUserData.role}
              showSettingsButton={true}
            />
          </div>

          <div className="col-lg-8">
            <div className="card shadow-sm">
              
              <div className="card-header bg-white">
                <ul className="nav nav-tabs card-header-tabs">
                  {/* <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'datos' ? 'active' : ''}`}
                      onClick={() => setActiveTab('datos')}
                    >
                      <i className="bi bi-person me-2"></i>
                      Datos
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'seguridad' ? 'active' : ''}`}
                      onClick={() => setActiveTab('seguridad')}
                    >
                      <i className="bi bi-shield-lock me-2"></i>
                      Seguridad
                    </button>
                  </li> */}
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'actividad' ? 'active' : ''}`}
                      onClick={() => setActiveTab('actividad')}
                    >
                      <i className="bi bi-bar-chart me-2"></i>
                      Actividad
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'sugerencias' ? 'active' : ''}`}
                      onClick={() => setActiveTab('sugerencias')}
                    >
                      <i className="bi bi-lightbulb-fill me-2"></i>
                      Sugerencias
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'penalizaciones' ? 'active' : ''}`}
                      onClick={() => setActiveTab('penalizaciones')}
                    >
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      Penalizaciones
                      {activePenaltiesCount > 0 && (
                        <span className="badge bg-danger ms-2">{activePenaltiesCount}</span>
                      )}
                    </button>
                  </li>
                </ul>
              </div>
              
              <div className="card-body">
                {/* {activeTab === 'datos' && (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="nombre" className="form-label">
                        <i className="bi bi-person me-2"></i>
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        <i className="bi bi-envelope me-2"></i>
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="bio" className="form-label">
                        <i className="bi bi-file-text me-2"></i>
                        Biografía
                      </label>
                      <textarea
                        className="form-control"
                        id="bio"
                        name="bio"
                        rows="3"
                        value={formData.bio}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="intereses" className="form-label">
                        <i className="bi bi-star me-2"></i>
                        Intereses
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="intereses"
                        name="intereses"
                        value={formData.intereses}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                      <button type="button" className="button">
                        Cancelar
                      </button>
                      <button type="submit" className="btn-buscar">
                        <i className="bi bi-save me-2"></i>
                        Guardar Cambios
                      </button>
                    </div>
                  </form>
                )}
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
                      <button type="button" className="button">
                        Cancelar
                      </button>
                      <button type="submit" className="btn-buscar">
                        <i className="bi bi-shield-check me-2"></i>
                        Cambiar Contraseña
                      </button>
                    </div>
                  </form>
                )} */}

                {/* Tab Actividad */}
                {activeTab === 'actividad' && (
                  <div className="card bg-light border-0">
                    <div className="card-body">
                      <h6 className="card-title mb-4">
                        <i className="bi bi-bar-chart me-2"></i>
                        Estadísticas de Lectura
                      </h6>
                      <div className="row text-center">
                        <div className="col-4">
                          <i className="bi bi-book-fill text-primary display-4 mb-2"></i>
                          <h3 className="fw-bold text-dark">{mockUserData.librosLeidos}</h3>
                          <small className="text-muted">Libros Leídos</small>
                        </div>
                        <div className="col-4">
                          <i className="bi bi-bookmark-fill text-warning display-4 mb-2"></i>
                          <h3 className="fw-bold text-dark">{mockUserData.enProgreso}</h3>
                          <small className="text-muted">En Progreso</small>
                        </div>
                        <div className="col-4">
                          <i className="bi bi-clock-fill text-success display-4 mb-2"></i>
                          <h3 className="fw-bold text-dark">{mockUserData.horasTotales}</h3>
                          <small className="text-muted">Horas Totales</small>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'sugerencias' && (
                  <div className="card-body">
                    <h6 className="mb-3">
                      <i className="bi bi-lightbulb-fill me-2"></i>
                      Sugerencias de mejoras
                    </h6>
                    <p className="text-muted">
                      ¿Tienes alguna idea para mejorar nuestra plataforma? ¡Nos encantaría escucharla!
                    </p>
                    <form>
                      <div className="mb-3">
                        <label htmlFor="suggestion" className="form-label">
                          Tu Sugerencia
                        </label>
                        <textarea
                          className="form-control"
                          id="suggestion" 
                          rows="4"
                          placeholder="Comparte tus ideas para mejorar..."
                        ></textarea>
                      </div>
                      <button type="submit" className="btn-buscar">
                        <i className="bi bi-send me-2"></i>
                        Enviar Sugerencia
                      </button>
                    </form>
                  </div>
                )}

                {activeTab === 'penalizaciones' && (
                  <div>
                    <h6 className="mb-3">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      Historial de Penalizaciones
                    </h6>
                    
                    {mockPenalties.length === 0 ? (
                      <div className="text-center py-5">
                        <i className="bi bi-check-circle text-success" style={{ fontSize: '3rem' }}></i>
                        <h5 className="mt-3">No tienes penalizaciones</h5>
                        <p className="text-muted">¡Sigue así!</p>
                      </div>
                    ) : (
                      <>
                        <div className="table-responsive">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Motivo</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th className="text-center">Acción</th>
                              </tr>
                            </thead>
                            <tbody>
                              {mockPenalties.map((penalty) => (
                                <tr key={penalty.id}>
                                  <td>
                                    <i className="bi bi-exclamation-circle text-danger me-2"></i>
                                    {penalty.motivo}
                                  </td>
                                  <td>
                                    <small className="text-muted">
                                      {new Date(penalty.fecha).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                      })}
                                    </small>
                                  </td>
                                  <td>
                                    <span
                                      className={`badge ${
                                        penalty.estado === "Activa" 
                                          ? "bg-danger" 
                                          : "bg-secondary"
                                      }`}
                                    >
                                      {penalty.estado}
                                    </span>
                                  </td>
                                  <td className="text-center">
                                    {penalty.estado === "Activa" ? (
                                      <button className="btn btn-outline-dark btn-sm">
                                        <i className="bi bi-envelope me-1"></i>
                                        Apelar
                                      </button>
                                    ) : (
                                      <span className="text-muted">—</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {activePenaltiesCount > 0 && (
                          <div className="mt-4 p-3 bg-light rounded">
                            <h6 className="mb-3">
                              <i className="bi bi-chat-left-text me-2"></i>
                              Enviar Apelación
                            </h6>
                            <form>
                              <div className="mb-3">
                                <label htmlFor="penaltyReason" className="form-label">
                                  Explica por qué consideras injusta la penalización
                                </label>
                                <textarea
                                  className="form-control"
                                  id="penaltyReason"
                                  rows="4"
                                  placeholder="Proporciona detalles sobre tu situación..."
                                ></textarea>
                              </div>
                              <button type="submit" className="btn-buscar">
                                <i className="bi bi-send me-2"></i>
                                Enviar Apelación
                              </button>
                            </form>
                          </div>
                        )}
                      </>
                    )}
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