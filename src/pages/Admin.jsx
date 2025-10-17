import { Users, Shield, Search, Plus, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function AdminPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: 'linear-gradient(135deg, #f3e9e0 0%, #fff 100%)' }}
    >
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <div className="mb-5">
          <h1 className="display-5 fw-bold mb-2" style={{ color: '#6e3b3b' }}>
            Administración
          </h1>
          <p className="text-muted">Gestiona usuarios y roles del sistema</p>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-6 col-lg-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h6
                    className="card-title mb-0"
                    style={{ fontSize: '0.875rem' }}
                  >
                    Total Usuarios
                  </h6>
                  <Users size={18} className="text-muted" />
                </div>
                <h3 className="fw-bold mb-2">1,234</h3>
                <small className="text-muted">+12% desde el mes pasado</small>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h6
                    className="card-title mb-0"
                    style={{ fontSize: '0.875rem' }}
                  >
                    Administradores
                  </h6>
                  <Shield size={18} className="text-muted" />
                </div>
                <h3 className="fw-bold mb-2">8</h3>
                <small className="text-muted">Usuarios con rol admin</small>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h6
                    className="card-title mb-0"
                    style={{ fontSize: '0.875rem' }}
                  >
                    Editores
                  </h6>
                  <Users size={18} className="text-muted" />
                </div>
                <h3 className="fw-bold mb-2">45</h3>
                <small className="text-muted">Usuarios con rol editor</small>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h6
                    className="card-title mb-0"
                    style={{ fontSize: '0.875rem' }}
                  >
                    Lectores
                  </h6>
                  <Users size={18} className="text-muted" />
                </div>
                <h3 className="fw-bold mb-2">1,181</h3>
                <small className="text-muted">Usuarios con rol lector</small>
              </div>
            </div>
          </div>
        </div>

        {/* Users Management Card */}
        <div className="card shadow-sm">
          {/* Card Header */}
          <div className="card-header bg-white d-flex justify-content-between align-items-start">
            <div>
              <h5 className="card-title mb-1">Gestión de Usuarios</h5>
              <p className="card-text text-muted mb-0">
                Administra los usuarios y sus roles en el sistema
              </p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              <Plus size={16} className="me-2" style={{ display: 'inline' }} />
              Nuevo Usuario
            </button>
          </div>

          {/* Card Body */}
          <div className="card-body">
            {/* Search */}
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

            {/* Table */}
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr style={{ borderBottom: '2px solid #e9ecef' }}>
                    <th style={{ color: '#6e3b3b', fontWeight: '600' }}>
                      Usuario
                    </th>
                    <th style={{ color: '#6e3b3b', fontWeight: '600' }}>
                      Email
                    </th>
                    <th style={{ color: '#6e3b3b', fontWeight: '600' }}>Rol</th>
                    <th style={{ color: '#6e3b3b', fontWeight: '600' }}>
                      Estado
                    </th>
                    <th
                      className="text-end"
                      style={{ color: '#6e3b3b', fontWeight: '600' }}
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-medium">María García</td>
                    <td>maria@ejemplo.com</td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: '#6e3b3b',
                          color: '#fff',
                        }}
                      >
                        Administrador
                      </span>
                    </td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: '#d4edda',
                          color: '#155724',
                          border: '1px solid #c3e6cb',
                        }}
                      >
                        Activo
                      </span>
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-ghost me-2"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-ghost text-danger"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td className="fw-medium">Carlos López</td>
                    <td>carlos@ejemplo.com</td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: '#c9a66b',
                          color: '#fff',
                        }}
                      >
                        Editor
                      </span>
                    </td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: '#d4edda',
                          color: '#155724',
                          border: '1px solid #c3e6cb',
                        }}
                      >
                        Activo
                      </span>
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-ghost me-2"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-ghost text-danger"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td className="fw-medium">Ana Martínez</td>
                    <td>ana@ejemplo.com</td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: '#e9ecef',
                          color: '#495057',
                          border: '1px solid #dee2e6',
                        }}
                      >
                        Lector
                      </span>
                    </td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: '#d4edda',
                          color: '#155724',
                          border: '1px solid #c3e6cb',
                        }}
                      >
                        Activo
                      </span>
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-ghost me-2"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-ghost text-danger"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td className="fw-medium">Pedro Sánchez</td>
                    <td>pedro@ejemplo.com</td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: '#e9ecef',
                          color: '#495057',
                          border: '1px solid #dee2e6',
                        }}
                      >
                        Lector
                      </span>
                    </td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: '#fff3cd',
                          color: '#856404',
                          border: '1px solid #ffeeba',
                        }}
                      >
                        Inactivo
                      </span>
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-ghost me-2"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-ghost text-danger"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-bottom">
                <h5 className="modal-title">Crear Nuevo Usuario</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-muted mb-4">
                  Ingresa los datos del nuevo usuario
                </p>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Juan Pérez"
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
                    placeholder="juan@ejemplo.com"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Rol
                  </label>
                  <select className="form-select" id="role">
                    <option value="">Selecciona un rol</option>
                    <option value="admin">Administrador</option>
                    <option value="editor">Editor</option>
                    <option value="reader">Lector</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer border-top">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cerrar
                </button>
                <button type="button" className="btn btn-primary">
                  Crear Usuario
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
