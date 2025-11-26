import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createReviewAsync,
  updateReviewAsync,
  deleteReviewAsync,
  selectReviewsStatus,
  selectCreateStatus,
  selectCreateError,
  resetCreateStatus
} from "../../store/reviewsSlice";
import { createDenunciaAsync } from "../../store/denunciasSlice";
import { fetchUsersAsync } from "../../store/usersSlice";
import ReportModal from "./ReportModal";
import NotificationModal from "./NotificationModal";
import useNotification from "../../hooks/useNotification";
import { selectAuthUser } from "../../store/authSlice";

export default function Reviews({ bookId, reviews = [], onReviewChange }) {
  const dispatch = useDispatch();
  const status = useSelector(selectReviewsStatus);
  const createStatus = useSelector(selectCreateStatus);
  const createError = useSelector(selectCreateError);
  const user = useSelector(selectAuthUser);

  const [newReview, setNewReview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [texto, setTexto] = useState("");

  // Report Logic
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReviewForReport, setSelectedReviewForReport] = useState(null);
  const [isReporting, setIsReporting] = useState(false);
  const { notification, showNotification, closeNotification } = useNotification();

  useEffect(() => {
    if (createStatus === "succeeded") {
      setNewReview("");
      dispatch(resetCreateStatus());
      if (onReviewChange) onReviewChange();
    }
  }, [createStatus, dispatch, onReviewChange]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    await dispatch(
      createReviewAsync({
        idLibro: bookId,
        texto: newReview
      })
    );
  };

  const handleEdit = (review) => {
    setEditingId(review.id);
    setTexto(review.texto);
  };

  const handleUpdate = async (idResena) => {
    if (!texto.trim()) return;

    const result = await dispatch(
      updateReviewAsync({ idResena, texto })
    );

    if (updateReviewAsync.fulfilled.match(result)) {
      setEditingId(null);
      setTexto("");
      if (onReviewChange) onReviewChange();
    }
  };

  const handleDelete = async (idResena) => {
    if (window.confirm("¿Eliminar reseña?")) {
      const result = await dispatch(deleteReviewAsync(idResena));
      if (deleteReviewAsync.fulfilled.match(result)) {
        if (onReviewChange) onReviewChange();
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTexto("");
  };

  const handleOpenReport = (review) => {
    setSelectedReviewForReport(review);
    setShowReportModal(true);
  };

  const handleReportSubmit = async (comentario) => {
    if (!selectedReviewForReport || !user) return;

    setIsReporting(true);
    try {
      let idDenunciado = selectedReviewForReport.idUsuario;

      if (!idDenunciado) {
        const usersResponse = await dispatch(fetchUsersAsync({ pageSize: 100 })).unwrap();
        const users = usersResponse.results || [];
        const foundUser = users.find(u =>
          u.nombreUsuario === selectedReviewForReport.nombreUsuario ||
          u.userName === selectedReviewForReport.nombreUsuario ||
          u.nombre === selectedReviewForReport.nombreUsuario
        );
        if (foundUser) {
          idDenunciado = foundUser.id;
        }
      }

      if (!idDenunciado) {
        showNotification("No se pudo identificar al usuario autor de la reseña para denunciarlo.");
        setIsReporting(false);
        return;
      }

      await dispatch(createDenunciaAsync({
        idDenunciante: user.id,
        idDenunciado: idDenunciado,
        comentario: comentario
      })).unwrap();

      showNotification("Denuncia enviada exitosamente.");
      setShowReportModal(false);
      setSelectedReviewForReport(null);
    } catch (error) {
      showNotification("Error al enviar la denuncia.");
    } finally {
      setIsReporting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="text-center py-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando reseñas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h3 className="mb-4">
        <i className="bi bi-chat-left-text me-2"></i>
        Reseñas
      </h3>

      {user && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Escribe una reseña</h5>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Comparte tu opinión..."
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  disabled={createStatus === "loading"}
                  required
                />
              </div>

              {createStatus === "failed" && createError && (
                <div className="alert alert-danger">
                  {Array.isArray(createError)
                    ? createError.join(", ")
                    : createError}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={createStatus === "loading" || !newReview.trim()}
              >
                {createStatus === "loading" ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Publicando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send me-2"></i>Publicar reseña
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {reviews.length === 0 ? (
        <div className="alert alert-info">
          <i className="bi bi-info-circle me-2"></i>
          No hay reseñas todavía.
        </div>
      ) : (
        <div className="list-group">
          {reviews.map((review) => (
            <div key={review.id} className="list-group-item">
              <div className="d-flex justify-content-between mb-2">
                <div>
                  <h6 className="mb-1">
                    <i className="bi bi-person-circle me-2"></i>
                    {review.nombreUsuario ?? "Usuario"}
                  </h6>
                  <small className="text-muted">
                    {new Date(review.fechaCreacion).toLocaleDateString()}
                  </small>
                </div>
                {user && user.id === review.idUsuario && (
                  <div>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEdit(review)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(review.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                )}
                {user && user.id !== review.idUsuario && (
                  <button
                    className="btn btn-sm btn-outline-warning"
                    onClick={() => handleOpenReport(review)}
                  >
                    <i className="bi bi-flag me-1"></i>
                    Reportar
                  </button>
                )}
              </div>

              {editingId === review.id ? (
                <div>
                  <textarea
                    className="form-control mb-2"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    rows="3"
                  />
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => handleUpdate(review.id)}
                  >
                    Guardar
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={handleCancelEdit}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <p className="mb-0">{review.texto}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <ReportModal
        show={showReportModal}
        onClose={() => setShowReportModal(false)}
        onSubmit={handleReportSubmit}
        isLoading={isReporting}
      />

      <NotificationModal
        message={notification.message}
        isOpen={notification.isOpen}
        onClose={closeNotification}
      />
    </div>
  );
}
