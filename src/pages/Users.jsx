import { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

export default function Users() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container" style={{ maxWidth: '1200px' }}>
      
      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-start">
          <div>
            <h5 className="card-title mb-1">Gestión de Usuarios</h5>
            <p className="text-muted mb-0">
              Administra los usuarios y sus roles en el sistema
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <Plus size={16} className="me-2" />
            Nuevo Usuario
          </button>
        </div>
      </div>

      <div className="card-body">

        {/* Buscador */}
        <div className="mb-4 position-relative">
          <Search
            size={18}
            className="position-absolute text-muted"
            style={{ left: '12px', top: '10px', pointerEvents: 'none' }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Buscar usuarios..."
            style={{ paddingLeft: '40px' }}
          />
        </div>

        {/* Tabla */}
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr style={{ borderBottom: '2px solid #e9ecef' }}>
                <th style={{ color: '#6e3b3b', fontWeight: 600 }}>Usuario</th>
                <th style={{ color: '#6e3b3b', fontWeight: 600 }}>Email</th>
                <th style={{ color: '#6e3b3b', fontWeight: 600 }}>Rol</th>
                <th style={{ color: '#6e3b3b', fontWeight: 600 }}>Estado</th>
                <th className="text-end" style={{ color: '#6e3b3b', fontWeight: 600 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>

              {/* Usuario 1 */}
              <tr>
                <td className="fw-medium">María García</td>
                <td>maria@ejemplo.com</td>
                <td>
                  <span className="badge" style={{ backgroundColor: '#6e3b3b', color: 'white' }}>
                    Administrador
                  </span>
                </td>
                <td>
                  <span className="badge" style={{ backgroundColor: '#d4edda', color: '#155724' }}>
                    Activo
                  </span>
                </td>
                <td className="text-end">
                  <button className="btn btn-sm btn-ghost me-2"><Edit size={16} /></button>
                  <button className="btn btn-sm btn-ghost text-danger"><Trash2 size={16} /></button>
                </td>
              </tr>

              {/* Usuario 2 */}
              <tr>
                <td className="fw-medium">Carlos López</td>
                <td>carlos@ejemplo.com</td>
                <td>
                  <span className="badge" style={{ backgroundColor: '#c9a66b', color: '#fff' }}>
                    Editor
                  </span>
                </td>
                <td>
                  <span className="badge" style={{ backgroundColor: '#d4edda', color: '#155724' }}>
                    Activo
                  </span>
                </td>
                <td className="text-end">
                  <button className="btn btn-sm btn-ghost me-2"><Edit size={16} /></button>
                  <button className="btn btn-sm btn-ghost text-danger"><Trash2 size={16} /></button>
                </td>
              </tr>

              {/* Usuario 3 */}
              <tr>
                <td className="fw-medium">Ana Martínez</td>
                <td>ana@ejemplo.com</td>
                <td>
                  <span className="badge" style={{ backgroundColor: '#e9ecef', color: '#495057' }}>
                    Lector
                  </span>
                </td>
                <td>
                  <span className="badge" style={{ backgroundColor: '#d4edda', color: '#155724' }}>
                    Activo
                  </span>
                </td>
                <td className="text-end">
                  <button className="btn btn-sm btn-ghost me-2"><Edit size={16} /></button>
                  <button className="btn btn-sm btn-ghost text-danger"><Trash2 size={16} /></button>
                </td>
              </tr>

              {/* Usuario 4 */}
              <tr>
                <td className="fw-medium">Pedro Sánchez</td>
                <td>pedro@ejemplo.com</td>
                <td>
                  <span className="badge" style={{ backgroundColor: '#e9ecef', color: '#495057' }}>
                    Lector
                  </span>
                </td>
                <td>
                  <span className="badge" style={{ backgroundColor: '#fff3cd', color: '#856404' }}>
                    Inactivo
                  </span>
                </td>
                <td className="text-end">
                  <button className="btn btn-sm btn-ghost me-2"><Edit size={16} /></button>
                  <button className="btn btn-sm btn-ghost text-danger"><Trash2 size={16} /></button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* Modal crear usuario */}
      {showModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header border-bottom">
                <h5 className="modal-title">Crear Nuevo Usuario</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              <div className="modal-body">
                <p className="text-muted mb-4">Ingresa los datos del nuevo usuario</p>

                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" placeholder="Juan Pérez" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" placeholder="juan@ejemplo.com" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Rol</label>
                  <select className="form-select">
                    <option value="">Selecciona un rol</option>
                    <option value="admin">Administrador</option>
                    <option value="editor">Editor</option>
                    <option value="reader">Lector</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer border-top">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
                <button className="btn btn-primary">Crear Usuario</button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
