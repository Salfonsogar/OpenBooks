import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlertTriangle, Trash2, FileText, Calendar, User, Plus, X } from 'lucide-react';
import {
  fetchDenunciasAsync,
  createDenunciaAsync,
  deleteDenunciaAsync,
  selectAllDenuncias,
  selectDenunciasStatus,
  selectDenunciasPagination,
  selectDenunciasDeleteStatus,
  selectDenunciasCreateStatus,
  resetCreateStatus
} from '../store/denunciasSlice';

export default function DenunciasPage() {
  const dispatch = useDispatch();
  const denuncias = useSelector(selectAllDenuncias);
  const status = useSelector(selectDenunciasStatus);
  const deleteStatus = useSelector(selectDenunciasDeleteStatus);
  const createStatus = useSelector(selectDenunciasCreateStatus);
  const { pagina, totalPages } = useSelector(selectDenunciasPagination);

  const [showModal, setShowModal] = useState(false);

  const [idDenunciante, setIdDenunciante] = useState('');
  const [idDenunciado, setIdDenunciado] = useState('');
  const [comentario, setComentario] = useState('');

  useEffect(() => {
    dispatch(fetchDenunciasAsync({ pagina: 1, tamanoPagina: 10 }));
  }, [dispatch]);

  useEffect(() => {
    if (createStatus === 'succeeded') {
      setShowModal(false);
      setIdDenunciante('');
      setIdDenunciado('');
      setComentario('');
      dispatch(fetchDenunciasAsync({ pagina: 1, tamanoPagina: 10 }));
      dispatch(resetCreateStatus());
    }
  }, [createStatus, dispatch]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(fetchDenunciasAsync({ pagina: newPage, tamanoPagina: 10 }));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta denuncia?')) {
      await dispatch(deleteDenunciaAsync(id));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await dispatch(createDenunciaAsync({
      idDenunciante: parseInt(idDenunciante),
      idDenunciado: parseInt(idDenunciado),
      comentario
    }));
  };

  return (
    <div className="min-vh-100 py-5" style={{ background: 'linear-gradient(135deg, #f3e9e0 0%, #fff 100%)' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="d-flex justify-content-between align-items-end mb-5">
          <div>
            <h1 className="display-5 fw-bold mb-2" style={{ color: '#6e3b3b' }}>
              Gestión de Denuncias
            </h1>
            <p className="text-muted mb-0">
              Administra las denuncias realizadas por los usuarios.
            </p>
          </div>
          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() => setShowModal(true)}
          >
            <Plus size={18} />
            Nueva Denuncia
          </button>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-header bg-white border-bottom-0 pt-4 px-4 d-flex justify-content-between align-items-center">
            <h5 className="card-title m-0" style={{ color: '#6e3b3b' }}>Listado de Denuncias</h5>
            <span className="badge bg-light text-dark border">
              Total: {denuncias.length} (Página {pagina})
            </span>
          </div>

          <div className="card-body px-0">
            {status === 'loading' && denuncias.length === 0 ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : denuncias.length > 0 ? (
              <>
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="ps-4">ID</th>
                        <th>Denunciante (ID)</th>
                        <th>Denunciado (ID)</th>
                        <th>Comentario</th>
                        <th>Fecha</th>
                        <th className="text-end pe-4">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {denuncias.map((denuncia) => (
                        <tr key={denuncia.id}>
                          <td className="ps-4 text-muted">#{denuncia.id}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <User size={16} className="me-2 text-secondary" />
                              <span>{denuncia.idDenunciante}</span>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <User size={16} className="me-2 text-danger" />
                              <span>{denuncia.idDenunciado}</span>
                            </div>
                          </td>
                          <td className="text-muted" style={{ maxWidth: '300px' }}>
                            <div className="text-truncate" title={denuncia.comentario}>
                              {denuncia.comentario}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center text-muted small">
                              <Calendar size={14} className="me-1" />
                              {denuncia.fecha ? new Date(denuncia.fecha).toLocaleDateString() : 'N/A'}
                            </div>
                          </td>
                          <td className="text-end pe-4">
                            <button
                              className="btn btn-sm btn-outline-danger border-0"
                              onClick={() => handleDelete(denuncia.id)}
                              disabled={deleteStatus === 'loading'}
                              title="Eliminar denuncia"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="d-flex justify-content-center align-items-center mt-4 gap-3 pb-3">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      disabled={pagina <= 1 || status === 'loading'}
                      onClick={() => handlePageChange(pagina - 1)}
                    >
                      Anterior
                    </button>
                    <span className="text-muted small">
                      Página {pagina} de {totalPages}
                    </span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      disabled={pagina >= totalPages || status === 'loading'}
                      onClick={() => handlePageChange(pagina + 1)}
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-5 text-muted">
                <FileText size={48} className="mb-3 opacity-25" />
                <p>No hay denuncias registradas.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-bottom">
                <h5 className="modal-title">Nueva Denuncia</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleCreate}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-muted">ID Denunciante</label>
                    <input
                      type="number"
                      className="form-control"
                      value={idDenunciante}
                      onChange={(e) => setIdDenunciante(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-muted">ID Denunciado</label>
                    <input
                      type="number"
                      className="form-control"
                      value={idDenunciado}
                      onChange={(e) => setIdDenunciado(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-muted">Comentario</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer border-top">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={createStatus === 'loading'}
                  >
                    {createStatus === 'loading' ? 'Guardando...' : 'Crear Denuncia'}
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