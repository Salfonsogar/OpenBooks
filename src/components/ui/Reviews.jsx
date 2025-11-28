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
import "./Reviews.css";

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

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Fecha inválida";
      }
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch {
      return "Fecha inválida";
    }
  };

  if (status === "loading") {
    return (
      <div className="reviews-loading">
        <div className="spinner"></div>
        <span>Cargando reseñas...</span>
      </div>
    );
  }

  return (
    <div className="reviews-container">
      <h3 className="reviews-title">
        <i className="bi bi-chat-left-text"></i>
        Reseñas
      </h3>

      {user && (
        <div className="review-form-card">
          <h5 className="form-title">Escribe una reseña</h5>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <textarea
                className="review-textarea"
                rows="4"
                placeholder="Comparte tu opinión sobre este libro..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                disabled={createStatus === "loading"}
                required
              />
            </div>

            {createStatus === "failed" && createError && (
              <div className="error-alert">
                <i className="bi bi-exclamation-triangle"></i>
                {Array.isArray(createError)
                  ? createError.join(", ")
                  : createError}
              </div>
            )}

            <button
              type="submit"
              className="btn-submit"
              disabled={createStatus === "loading" || !newReview.trim()}
            >
              {createStatus === "loading" ? (
                <>
                  <span className="btn-spinner"></span>
                  Publicando...
                </>
              ) : (
                <>
                  <i className="bi bi-send"></i>
                  Publicar reseña
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {reviews.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-chat-left-text-fill"></i>
          <p>No hay reseñas todavía. ¡Sé el primero en compartir tu opinión!</p>
        </div>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="user-info">
                  <div className="user-avatar">
                    <i className="bi bi-person-circle"></i>
                  </div>
                  <div className="user-details">
                    <h6 className="user-name">
                      {review.nombreUsuario ?? "Usuario Anónimo"}
                    </h6>
                    <small className="review-date">
                      {formatDate(review.fechaCreacion)}
                    </small>
                  </div>
                </div>

                <div className="review-actions">
                  {user && user.id === review.idUsuario ? (
                    <>
                      <button
                        className="btn-icon btn-edit"
                        onClick={() => handleEdit(review)}
                        title="Editar"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn-icon btn-delete"
                        onClick={() => handleDelete(review.id)}
                        title="Eliminar"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </>
                  ) : user ? (
                    <button
                      className="btn-report"
                      onClick={() => handleOpenReport(review)}
                    >
                      <i className="bi bi-flag"></i>
                      Reportar
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="review-content">
                {editingId === review.id ? (
                  <div className="edit-form">
                    <textarea
                      className="review-textarea"
                      value={texto}
                      onChange={(e) => setTexto(e.target.value)}
                      rows="3"
                    />
                    <div className="edit-actions">
                      <button
                        className="btn-save"
                        onClick={() => handleUpdate(review.id)}
                      >
                        <i className="bi bi-check-lg"></i>
                        Guardar
                      </button>
                      <button
                        className="btn-cancel"
                        onClick={handleCancelEdit}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="review-text">{review.texto}</p>
                )}
              </div>
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