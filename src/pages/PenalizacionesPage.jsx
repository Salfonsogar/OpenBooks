import { AlertTriangle, Search, Trash2, User, Calendar, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersAsync } from '../store/usersSlice';
import { fetchSancionesPorUsuarioAsync, createSancionAsync, deleteSancionAsync } from '../store/sancionesSlice';

export default function PenalizacionesPage() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const [duracion, setDuracion] = useState(0);
  const [comentario, setComentario] = useState('');

  const { users, status: usersStatus } = useSelector((state) => state.users);
  const { sanciones, status: sancionesStatus } = useSelector((state) => state.sanciones);

  useEffect(() => {
    if (searchTerm.length > 2) {
      dispatch(fetchUsersAsync({ pageNumber: 1, pageSize: 100 }));
    }
  }, [searchTerm, dispatch]);

  const filteredUsers = users.filter(user =>
    user.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    dispatch(fetchSancionesPorUsuarioAsync(user.id));
    setSearchTerm('');
  };

  const handleCreateSancion = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    const newSancion = {
      idUsuario: selectedUser.id,
      duracion: parseInt(duracion),
      comentario: comentario
    };

    await dispatch(createSancionAsync(newSancion));
    dispatch(fetchSancionesPorUsuarioAsync(selectedUser.id));
    setDuracion(0);
    setComentario('');
  };

  const handleDeleteSancion = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta sanción?')) {
      await dispatch(deleteSancionAsync(id));
      if (selectedUser) {
        dispatch(fetchSancionesPorUsuarioAsync(selectedUser.id));
      }
    }
  };

  return (
    <>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="mb-5">
          <h1 className="display-5 fw-bold mb-2" style={{ color: '#6366F1' }}>
            Gestión de Sanciones
          </h1>
          <p className="text-muted">
            Busca un usuario para ver y gestionar sus penalizaciones.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="card-title mb-3" style={{ color: '#6366F1' }}>Buscar Usuario</h5>
                <div className="position-relative mb-3">
                  <Search size={18} className="position-absolute text-muted" style={{ left: '12px', top: '12px' }} />
                  <input
                    type="text"
                    className="form-control ps-5"
                    placeholder="Nombre o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {searchTerm.length > 0 && (
                  <div className="list-group list-group-flush overflow-auto" style={{ maxHeight: '300px' }}>
                    {usersStatus === 'loading' ? (
                      <div className="text-center p-3">Cargando...</div>
                    ) : filteredUsers.length > 0 ? (
                      filteredUsers.map(user => (
                        <button
                          key={user.id}
                          className={`list-group-item list-group-item-action ${selectedUser?.id === user.id ? 'active' : ''}`}
                          onClick={() => handleUserSelect(user)}
                        >
                          <div className="d-flex align-items-center">
                            <div className="bg-light rounded-circle p-2 me-2">
                              <User size={16} />
                            </div>
                            <div>
                              <div className="fw-bold">{user.nombre}</div>
                              <small className="text-muted">{user.email}</small>
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="text-center p-3 text-muted">No se encontraron usuarios</div>
                    )}
                  </div>
                )}

                {selectedUser && (
                  <div className="mt-4 p-3 bg-light rounded border">
                    <h6 className="fw-bold mb-2">Usuario Seleccionado:</h6>
                    <div className="d-flex align-items-center mb-2">
                      <User size={20} className="me-2 text-primary" />
                      <span className="fw-medium">{selectedUser.nombre}</span>
                    </div>
                    <div className="small text-muted">{selectedUser.email}</div>
                    <button
                      className="btn btn-sm btn-outline-secondary mt-3 w-100"
                      onClick={() => setSelectedUser(null)}
                    >
                      Limpiar selección
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-8">
            {selectedUser ? (
              <div className="d-flex flex-column gap-4">
                <div className="card shadow-sm border-0">
                  <div className="card-header bg-white border-bottom-0 pt-4 px-4">
                    <h5 className="card-title m-0" style={{ color: '#6366F1' }}>Nueva Sanción</h5>
                  </div>
                  <div className="card-body px-4 pb-4">
                    <form onSubmit={handleCreateSancion}>
                      <div className="row g-3">
                        <div className="col-md-4">
                          <label className="form-label small fw-bold text-muted">Duración (días)</label>
                          <div className="input-group">
                            <span className="input-group-text bg-light"><Calendar size={16} /></span>
                            <input
                              type="number"
                              className="form-control"
                              value={duracion}
                              onChange={(e) => setDuracion(e.target.value)}
                              min="1"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-8">
                          <label className="form-label small fw-bold text-muted">Comentario</label>
                          <div className="input-group">
                            <span className="input-group-text bg-light"><MessageSquare size={16} /></span>
                            <input
                              type="text"
                              className="form-control"
                              value={comentario}
                              onChange={(e) => setComentario(e.target.value)}
                              placeholder="Razón de la sanción..."
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12 text-end">
                          <button type="submit" className="btn btn-primary px-4">
                            Aplicar Sanción
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="card shadow-sm border-0">
                  <div className="card-header bg-white border-bottom-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                    <h5 className="card-title m-0" style={{ color: '#6366F1' }}>Historial de Sanciones</h5>
                    <span className="badge bg-light text-dark border">
                      Total: {sanciones.length}
                    </span>
                  </div>
                  <div className="card-body px-0">
                    {sancionesStatus === 'loading' ? (
                      <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Cargando...</span>
                        </div>
                      </div>
                    ) : sanciones.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                          <thead className="bg-light">
                            <tr>
                              <th className="ps-4">ID</th>
                              <th>Comentario</th>
                              <th>Duración</th>
                              <th>Fecha Inicio</th>
                              <th className="text-end pe-4">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sanciones.map((sancion) => (
                              <tr key={sancion.id}>
                                <td className="ps-4 text-muted">#{sancion.id}</td>
                                <td className="fw-medium">{sancion.comentario}</td>
                                <td>
                                  <span className="badge bg-warning text-dark">
                                    {sancion.duracion} días
                                  </span>
                                </td>
                                <td className="text-muted">
                                  {new Date(sancion.fechaInicio).toLocaleDateString()}
                                </td>
                                <td className="text-end pe-4">
                                  <button
                                    className="btn btn-sm btn-outline-danger border-0"
                                    onClick={() => handleDeleteSancion(sancion.id)}
                                    title="Eliminar sanción"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-5 text-muted">
                        <AlertTriangle size={48} className="mb-3 opacity-25" />
                        <p>Este usuario no tiene sanciones activas.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted border rounded-3 bg-light p-5" style={{ borderStyle: 'dashed !important' }}>
                <User size={64} className="mb-3 opacity-25" />
                <h4>Selecciona un usuario</h4>
                <p>Utiliza el buscador de la izquierda para encontrar un usuario y gestionar sus sanciones.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}