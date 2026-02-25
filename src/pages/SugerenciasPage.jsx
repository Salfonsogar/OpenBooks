import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Lightbulb, Trash2, FileText, User } from 'lucide-react';
import {
  fetchSugerenciasAsync,
  deleteSugerenciaAsync,
  selectAllSugerencias,
  selectSugerenciasStatus,
  selectSugerenciasPagination,
  selectSugerenciasDeleteStatus
} from '../store/sugerenciasSlice';

export default function SugerenciasPage() {
  const dispatch = useDispatch();
  const sugerencias = useSelector(selectAllSugerencias);
  const status = useSelector(selectSugerenciasStatus);
  const deleteStatus = useSelector(selectSugerenciasDeleteStatus);
  const { pagina, totalPages } = useSelector(selectSugerenciasPagination);

  useEffect(() => {
    dispatch(fetchSugerenciasAsync({ pagina: 1, tamanoPagina: 10 }));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(fetchSugerenciasAsync({ pagina: newPage, tamanoPagina: 10 }));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta sugerencia?')) {
      await dispatch(deleteSugerenciaAsync(id));
    }
  };

  return (
    <>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="d-flex justify-content-between align-items-end mb-5">
          <div>
            <h1 className="display-5 fw-bold mb-2" style={{ color: '#6366F1' }}>
              Gestión de Sugerencias
            </h1>
            <p className="text-muted mb-0">
              Revisa y administra las sugerencias enviadas por los usuarios.
            </p>
          </div>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-header bg-white border-bottom-0 pt-4 px-4 d-flex justify-content-between align-items-center">
            <h5 className="card-title m-0" style={{ color: '#6366F1' }}>Listado de Sugerencias</h5>
            <span className="badge bg-light text-dark border">
              Total: {sugerencias.length} (Página {pagina})
            </span>
          </div>

          <div className="card-body px-0">
            {status === 'loading' && sugerencias.length === 0 ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : sugerencias.length > 0 ? (
              <>
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="ps-4">ID</th>
                        <th>Usuario (ID)</th>
                        <th>Comentario</th>
                        <th className="text-end pe-4">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sugerencias.map((sugerencia) => (
                        <tr key={sugerencia.id}>
                          <td className="ps-4 text-muted">#{sugerencia.id}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <User size={16} className="me-2 text-secondary" />
                              <span>{sugerencia.idUsuario}</span>
                            </div>
                          </td>
                          <td className="text-muted" style={{ maxWidth: '400px' }}>
                            <div className="text-truncate" title={sugerencia.comentario}>
                              {sugerencia.comentario}
                            </div>
                          </td>
                          <td className="text-end pe-4">
                            <button
                              className="btn btn-sm btn-outline-danger border-0"
                              onClick={() => handleDelete(sugerencia.id)}
                              disabled={deleteStatus === 'loading'}
                              title="Eliminar sugerencia"
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
                <Lightbulb size={48} className="mb-3 opacity-25" />
                <p>No hay sugerencias registradas.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}