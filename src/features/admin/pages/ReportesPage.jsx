import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlertTriangle, Trash2, FileText, Calendar, User } from 'lucide-react';
import {
  fetchDenunciasAsync,
  deleteDenunciaAsync,
  selectAllDenuncias,
  selectDenunciasStatus,
  selectDenunciasPagination,
  selectDenunciasDeleteStatus
} from '../store/denunciasSlice';

export default function ReportesPage() {
  const dispatch = useDispatch();
  const denuncias = useSelector(selectAllDenuncias);
  const status = useSelector(selectDenunciasStatus);
  const deleteStatus = useSelector(selectDenunciasDeleteStatus);
  const { pagina, totalPages } = useSelector(selectDenunciasPagination);

  useEffect(() => {
    dispatch(fetchDenunciasAsync({ pagina: 1, tamanoPagina: 10 }));
  }, [dispatch]);

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

  return (
    <>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="mb-5">
          <h1 className="display-5 fw-bold mb-2" style={{ color: '#6366F1' }}>
            Gestión de Reportes
          </h1>
          <p className="text-muted">
            Administra las denuncias y reportes generados por los usuarios.
          </p>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-header bg-white border-bottom-0 pt-4 px-4 d-flex justify-content-between align-items-center">
            <h5 className="card-title m-0" style={{ color: '#6366F1' }}>Denuncias Recientes</h5>
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
                        <th>Motivo</th>
                        <th>Descripción</th>
                        <th>Fecha</th>
                        <th>Usuario Reportado</th>
                        <th className="text-end pe-4">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {denuncias.map((denuncia) => (
                        <tr key={denuncia.id}>
                          <td className="ps-4 text-muted">#{denuncia.id}</td>
                          <td className="fw-medium">
                            <span className="badge bg-warning text-dark bg-opacity-25 border border-warning">
                              {denuncia.motivo}
                            </span>
                          </td>
                          <td className="text-muted" style={{ maxWidth: '300px' }}>
                            <div className="text-truncate" title={denuncia.descripcion}>
                              {denuncia.descripcion}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center text-muted small">
                              <Calendar size={14} className="me-1" />
                              {new Date(denuncia.fecha).toLocaleDateString()}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <User size={16} className="me-2 text-secondary" />
                              <span>{denuncia.usuarioReportado || 'N/A'}</span>
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
    </>
  );
}
