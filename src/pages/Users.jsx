import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Upload, X, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsersAsync,
  createUserAsync,
  updateUserAsync,
  deleteUserAsync,
  selectAllUsers,
  selectUsersStatus,
  selectUsersPagination,
  selectUserCreateStatus,
  selectUserCreateError,
  selectUserUpdateStatus,
  selectUserUpdateError,
  resetCreateStatus,
  resetUpdateStatus
} from '../store/usersSlice';
import { selectAllRoles } from '../store/rolesSlice';

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const status = useSelector(selectUsersStatus);
  const pagination = useSelector(selectUsersPagination);
  const createStatus = useSelector(selectUserCreateStatus);
  const createError = useSelector(selectUserCreateError);
  const updateStatus = useSelector(selectUserUpdateStatus);
  const updateError = useSelector(selectUserUpdateError);
  const roles = useSelector(selectAllRoles);

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    userName: "",
    email: "",
    contraseña: "",
    rolId: 0,
    estado: true,
    sancionado: false,
    fotoPerfilBase64: ""
  });
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    dispatch(fetchUsersAsync({ pageNumber: 1, pageSize: 10 }));
  }, [dispatch]);

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({
      nombreCompleto: "",
      userName: "",
      email: "",
      contraseña: "",
      rolId: 0,
      estado: true,
      sancionado: false,
      fotoPerfilBase64: ""
    });
    dispatch(resetCreateStatus());
    dispatch(resetUpdateStatus());
    setPreviewImage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rolId' ? parseInt(value) : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("La imagen no debe superar 2MB");
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert("Solo se permiten archivos de imagen");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setFormData(prev => ({ ...prev, fotoPerfilBase64: base64String }));
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, fotoPerfilBase64: "" }));
    setPreviewImage("");
  };

  const openModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        nombreCompleto: user.nombreCompleto || "",
        userName: user.userName || "",
        email: user.email || "",
        contraseña: "",
        rolId: user.rolId || 0,
        estado: user.estado !== undefined ? user.estado : true,
        sancionado: user.sancionado || false,
        fotoPerfilBase64: user.fotoPerfil || ""
      });
      setPreviewImage(user.fotoPerfil ? `data:image/jpeg;base64,${user.fotoPerfil}` : "");
    } else {
      setEditingUser(null);
      const defaultRole = roles.find(r => r.name === 'Usuario');
      setFormData({
        nombreCompleto: "",
        userName: "",
        email: "",
        contraseña: "",
        rolId: defaultRole ? defaultRole.id : 0,
        estado: true,
        sancionado: false,
        fotoPerfilBase64: ""
      });
    }
    dispatch(resetCreateStatus());
    dispatch(resetUpdateStatus());
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUser) {
      const result = await dispatch(updateUserAsync({ id: editingUser.id, userData: formData }));
      if (updateUserAsync.fulfilled.match(result)) {
        handleCloseModal();
        dispatch(fetchUsersAsync({ pageNumber: pagination.currentPage, pageSize: pagination.pageSize }));
      }
    } else {
      const result = await dispatch(createUserAsync(formData));
      if (createUserAsync.fulfilled.match(result)) {
        handleCloseModal();
        dispatch(fetchUsersAsync({ pageNumber: pagination.currentPage, pageSize: pagination.pageSize }));
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      const result = await dispatch(deleteUserAsync(id));
      if (deleteUserAsync.fulfilled.match(result)) {
        dispatch(fetchUsersAsync({ pageNumber: pagination.currentPage, pageSize: pagination.pageSize }));
      }
    }
  };

  const handlePageChange = (newPage) => {
    dispatch(fetchUsersAsync({ pageNumber: newPage, pageSize: pagination.pageSize }));
  };

  return (
    <>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="display-5 fw-bold mb-2" style={{ color: '#6366F1' }}>Gestión de Usuarios</h1>
            <p className="text-muted">Administra los usuarios y sus roles en el sistema</p>
          </div>
          <button className="btn btn-main btn-lg" onClick={() => openModal()}>
            <Plus size={16} className="me-2" />
            Nuevo Usuario
          </button>
        </div>

        <div className="card shadow-sm p-4">
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

          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {status === 'loading' ? (
                  <tr><td colSpan="5" className="text-center py-4">Cargando usuarios...</td></tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      No hay usuarios registrados
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td className="fw-medium">
                        <div>{user.userName}</div>
                        <small className="text-muted">{user.nombreCompleto}</small>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${user.nombreRol === 'Administrador' ? 'bg-danger' : 'bg-primary'}`}>
                          {user.nombreRol}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${user.estado ? 'bg-success' : 'bg-warning'}`}>
                          {user.estado ? 'Activo' : 'Inactivo'}
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

          {pagination.totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <nav>
                <ul className="pagination">
                  <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(pagination.currentPage - 1)}>Anterior</button>
                  </li>
                  {[...Array(pagination.totalPages)].map((_, i) => (
                    <li key={i + 1} className={`page-item ${pagination.currentPage === i + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(pagination.currentPage + 1)}>Siguiente</button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
                </h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {((createStatus === 'failed' && createError) || (updateStatus === 'failed' && updateError)) && (
                    <div className="alert alert-danger">
                      <ul className="mb-0 ps-3">
                        {Array.isArray(createError || updateError) ? (createError || updateError).map((err, idx) => (
                          <li key={idx}>{err}</li>
                        )) : <li>{createError || updateError}</li>}
                      </ul>
                    </div>
                  )}

                  <div className="mb-3 text-center">
                    <label className="form-label fw-bold d-block mb-2">Foto de Perfil</label>
                    {previewImage ? (
                      <div className="position-relative d-inline-block">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="rounded-circle"
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                        <button
                          type="button"
                          className="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle"
                          onClick={handleRemoveImage}
                          style={{ width: '25px', height: '25px', padding: 0 }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div
                        className="rounded-circle bg-secondary d-inline-flex align-items-center justify-content-center"
                        style={{ width: '100px', height: '100px' }}
                      >
                        <User size={40} className="text-white" />
                      </div>
                    )}
                    <div className="mt-2">
                      <label htmlFor="imageUpload" className="btn btn-outline-primary btn-sm">
                        <Upload size={14} className="me-1" />
                        Subir Imagen
                      </label>
                      <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="d-none"
                      />
                      <small className="d-block text-muted mt-1">Máx 2MB</small>
                    </div>
                  </div>


                  <div className="mb-3">
                    <label className="form-label">Nombre de Usuario</label>
                    <input
                      type="text"
                      className="form-control"
                      name="userName"
                      value={formData.userName}
                      onChange={handleInputChange}
                      placeholder="juanperez"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Nombre Completo</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nombreCompleto"
                      value={formData.nombreCompleto}
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
                    {!editingUser && <small className="text-muted">Debe contener mayúscula, número y carácter especial.</small>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Rol</label>
                    <select
                      className="form-select"
                      name="rolId"
                      value={formData.rolId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value={0}>Seleccionar Rol</option>
                      {roles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="estadoCheck"
                        name="estado"
                        checked={formData.estado}
                        onChange={(e) => setFormData(prev => ({ ...prev, estado: e.target.checked }))}
                      />
                      <label className="form-check-label" htmlFor="estadoCheck">
                        Usuario Activo
                      </label>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="sancionadoCheck"
                        name="sancionado"
                        checked={formData.sancionado}
                        onChange={(e) => setFormData(prev => ({ ...prev, sancionado: e.target.checked }))}
                      />
                      <label className="form-check-label" htmlFor="sancionadoCheck">
                        Usuario Sancionado
                      </label>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={createStatus === 'loading' || updateStatus === 'loading'}>
                    {(createStatus === 'loading' || updateStatus === 'loading') ? 'Guardando...' : 'Guardar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
