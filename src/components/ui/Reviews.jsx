import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookReviewsAsync,
  createReviewAsync,
  updateReviewAsync,
  deleteReviewAsync,
  selectBookReviews,
  selectReviewsStatus,
  selectCreateStatus,
  selectCreateError,
  resetCreateStatus
} from "../../store/reviewsSlice";

import { selectAuthUser } from "../../store/authSlice";

export default function Reviews({ bookId }) {
  const dispatch = useDispatch();
  const reviews = useSelector(selectBookReviews);
  const status = useSelector(selectReviewsStatus);
  const createStatus = useSelector(selectCreateStatus);
  const createError = useSelector(selectCreateError);
  const user = useSelector(selectAuthUser);

  const [newReview, setNewReview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (bookId) {
      dispatch(fetchBookReviewsAsync({ idLibro: bookId }));
    }
  }, [dispatch, bookId]);

  useEffect(() => {
    if (createStatus === "succeeded") {
      setNewReview("");
      dispatch(resetCreateStatus());
    }
  }, [createStatus, dispatch]);

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
    setEditText(review.texto);
  };

  const handleUpdate = async (idResena) => {
    if (!editText.trim()) return;

    const result = await dispatch(
      updateReviewAsync({ idResena, texto: editText })
    );

    if (updateReviewAsync.fulfilled.match(result)) {
      setEditingId(null);
      setEditText("");
    }
  };

  const handleDelete = async (idResena) => {
    if (window.confirm("¿Eliminar reseña?")) {
      await dispatch(deleteReviewAsync(idResena));
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
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
                    {review.fecha &&
                      new Date(review.fecha).toLocaleDateString()}
                  </small>
                </div>

                {user && review.idUsuario === user.id && (
                  <div className="btn-group btn-group-sm">
                    {editingId === review.id ? (
                      <>
                        <button
                          className="btn btn-success"
                          onClick={() => handleUpdate(review.id)}
                        >
                          <i className="bi bi-check"></i>
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={handleCancelEdit}
                        >
                          <i className="bi bi-x"></i>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => handleEdit(review)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(review.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {editingId === review.id ? (
                <textarea
                  className="form-control"
                  rows="3"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <p className="mb-0">{review.texto}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
