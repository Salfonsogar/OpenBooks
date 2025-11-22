import { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

export default function Users() {
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    contraseña: "",
    rol: "Usuario"
  });

  // Datos de ejemplo (en producción vendrían de Redux/API)
  const [users] = useState([
    { id: 1, nombre: "María García", email: "maria@ejemplo.com", rol: "Admin", estado: "Activo" },
    { id: 2, nombre: "Carlos López", email: "carlos@ejemplo.com", rol: "Usuario", estado: "Activo" },
    { id: 3, nombre: "Ana Martínez", email: "ana@ejemplo.com", rol: "Usuario", estado: "Activo" },
    { id: 4, nombre: "Pedro Sánchez", email: "pedro@ejemplo.com", rol: "Usuario", estado: "Inactivo" }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        nombre: user.nombre || "",
        email: user.email || "",
        contraseña: "", // No mostramos la contraseña actual
        rol: user.rol || "Usuario"
      });
    } else {
      setEditingUser(null);
      setFormData({
        nombre: "",
        email: "",
        contraseña: "",
        rol: "Usuario"
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para crear/actualizar usuario
    console.log("Guardando usuario:", formData);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      // Aquí iría la lógica para eliminar usuario
      console.log("Eliminando usuario:", id);
    }
  };

  return (
    <div className="min-vh-100 py-5" style={{ background: 'linear-gradient(135deg, #f3e9e0 0%, #fff 100%)' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="display-5 fw-bold mb-2" style={{ color: '#6e3b3b' }}>Gestión de Usuarios</h1>
            <p className="text-muted">Administra los usuarios y sus roles en el sistema</p>
          </div>
          <button className="btn btn-main btn-lg" onClick={() => openModal()}>
            <Plus size={16} className="me-2" />
            Nuevo Usuario
          </button>
        </div>

        <div className="card shadow-sm p-4">
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
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      No hay usuarios registrados
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td className="fw-medium">{user.nombre}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${user.rol === 'Admin' ? 'bg-danger' : 'bg-primary'}`}>
                          {user.rol}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${user.estado === 'Activo' ? 'bg-success' : 'bg-warning'}`}>
                          {user.estado}
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => openModal(user)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Juan Pérez"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="juan@ejemplo.com"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Contraseña {editingUser && "(dejar en blanco para no cambiar)"}
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="contraseña"
                      value={formData.contraseña}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required={!editingUser}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Rol</label>
                    <select
                      className="form-select"
                      name="rol"
                      value={formData.rol}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Usuario">Usuario</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
