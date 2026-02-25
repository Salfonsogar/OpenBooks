import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, FileText, User } from 'lucide-react';
import {
  fetchDenunciasAsync,
  selectAllDenuncias,
  selectDenunciasStatus,
  selectDenunciasPagination
} from '../store/denunciasSlice';
import { createSancionAsync, selectSancionesCreateStatus, resetStatus } from '../store/sancionesSlice';
import SancionModal from '../components/ui/SancionModal';
import NotificationModal from '../components/ui/NotificationModal';
import useNotification from '../hooks/useNotification';

export default function DenunciasPage() {
  const dispatch = useDispatch();
  const denuncias = useSelector(selectAllDenuncias);
  const status = useSelector(selectDenunciasStatus);
  const sancionCreateStatus = useSelector(selectSancionesCreateStatus);
  const { pagina, totalPages } = useSelector(selectDenunciasPagination);

  const [showSancionModal, setShowSancionModal] = useState(false);
  const [selectedDenuncia, setSelectedDenuncia] = useState(null);
  const { notification, showNotification, closeNotification } = useNotification();

  useEffect(() => {
    dispatch(fetchDenunciasAsync({ pagina: 1, tamanoPagina: 10 }));
  }, [dispatch]);

  useEffect(() => {
    if (sancionCreateStatus === 'succeeded') {
      setShowSancionModal(false);
      setSelectedDenuncia(null);
      dispatch(resetStatus());
      showNotification('Sanción creada exitosamente');
    } else if (sancionCreateStatus === 'failed') {
      showNotification('Error al crear la sanción');
    }
  }, [sancionCreateStatus, dispatch, showNotification]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(fetchDenunciasAsync({ pagina: newPage, tamanoPagina: 10 }));
    }
  };

  const handleOpenSancionModal = (denuncia) => {
    setSelectedDenuncia(denuncia);
    setShowSancionModal(true);
  };

  const handleCreateSancion = async ({ duracion, comentario }) => {
    if (!selectedDenuncia) {
      return;
    }

    const sancionData = {
      idUsuario: selectedDenuncia.idDenunciado,
      duracion,
      comentario
    };

    await dispatch(createSancionAsync(sancionData));
  };

  return (
    <>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="d-flex justify-content-between align-items-end mb-5">
          <div>
            <h1 className="display-5 fw-bold mb-2" style={{ color: '#6366F1' }}>
              Gestión de Denuncias
            </h1>
            <p className="text-muted mb-0">
              Administra las denuncias realizadas por los usuarios y aplica sanciones.
            </p>
          </div>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-header bg-white border-bottom-0 pt-4 px-4 d-flex justify-content-between align-items-center">
            <h5 className="card-title m-0" style={{ color: '#6366F1' }}>Listado de Denuncias</h5>
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
                        <th>Denunciante</th>
                        <th>Denunciado</th>
                        <th>Comentario</th>
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
                              <span>{denuncia.nombreDenunciante || denuncia.idDenunciante}</span>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <User size={16} className="me-2 text-danger" />
                              <span>{denuncia.nombreDenunciado || denuncia.idDenunciado}</span>
                            </div>
                          </td>
                          <td className="text-muted" style={{ maxWidth: '300px' }}>
                            <div className="text-truncate" title={denuncia.comentario}>
                              {denuncia.comentario}
                            </div>
                          </td>
                          <td className="text-end pe-4">
                            <button
                              className="btn btn-sm btn-warning"
                              onClick={() => handleOpenSancionModal(denuncia)}
                              title="Aplicar sanción"
                            >
                              <i className="bi bi-exclamation-triangle me-1"></i>
                              Sancionar
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

      <SancionModal
        show={showSancionModal}
        onClose={() => {
          setShowSancionModal(false);
          setSelectedDenuncia(null);
        }}
        onSubmit={handleCreateSancion}
        isLoading={sancionCreateStatus === 'loading'}
        denunciadoNombre={selectedDenuncia?.nombreDenunciado || selectedDenuncia?.idDenunciado || ''}
      />

      <NotificationModal
        message={notification.message}
        isOpen={notification.isOpen}
        onClose={closeNotification}
      />
    </>
  );
}