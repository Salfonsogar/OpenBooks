import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchReviewsAsync,
    selectAllReviews,
    selectReviewsStatus,
    deleteReviewAsync,
    selectDeleteStatus,
    selectDeleteError,
    updateReviewAsync,
    selectUpdateStatus,
    selectReviewsPagination
} from "../store/reviewsSlice";
import { selectAuthUser } from "../store/authSlice";

export default function AdminReviews() {
    const dispatch = useDispatch();
    const reviews = useSelector(selectAllReviews);
    const status = useSelector(selectReviewsStatus);
    const deleteStatus = useSelector(selectDeleteStatus);
    const deleteError = useSelector(selectDeleteError);
    const updateStatus = useSelector(selectUpdateStatus);
    const { page = 1, totalPages = 1 } =
        useSelector(selectReviewsPagination) || {};
    const user = useSelector(selectAuthUser);

    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    useEffect(() => {
        dispatch(fetchReviewsAsync({ page: 1, pageSize: 5 }));
    }, [dispatch]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            dispatch(fetchReviewsAsync({ page: newPage, pageSize: 5 }));
        }
    };

    const startEdit = (review) => {
        setEditingId(review.id);
        setEditText(review.texto || review.comentario || "");
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditText("");
    };

    const handleUpdate = async (id) => {
        if (!editText.trim()) return;
        await dispatch(updateReviewAsync({ idResena: id, texto: editText }));
        setEditingId(null);
        setEditText("");
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta reseña?")) {
            await dispatch(deleteReviewAsync(id));
        }
    };

    // Show loading spinner only on initial load or if explicitly needed
    // We might want to show list even if loading next page, with a subtle indicator
    if (status === "loading" && reviews.length === 0) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando reseñas...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0" style={{ color: '#6e3b3b' }}>
                    <i className="bi bi-chat-left-text me-2"></i>
                    Gestión de Reseñas
                </h2>
            </div>

            {reviews.length === 0 && status !== 'loading' ? (
                <div className="alert alert-info">No hay reseñas registradas.</div>
            ) : (
                <>
                    <div className="list-group shadow-sm">
                        {reviews.map((review) => (
                            <div key={review.id} className="list-group-item p-4 border-start-0 border-end-0">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div>
                                        <h6 className="mb-1 fw-bold text-dark">
                                            {review.usuarioNombre || review.nombreUsuario || "Usuario"}
                                        </h6>
                                        <small className="text-muted">
                                            {review.fechaCreacion && new Date(review.fechaCreacion).toLocaleDateString()}
                                        </small>
                                    </div>
                                    <div className="btn-group btn-group-sm">
                                        {editingId === review.id ? (
                                            <>
                                                <button
                                                    className="btn btn-success"
                                                    onClick={() => handleUpdate(review.id)}
                                                    disabled={updateStatus === "loading"}
                                                    title="Guardar"
                                                >
                                                    <i className="bi bi-check-lg"></i>
                                                </button>
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={cancelEdit}
                                                    title="Cancelar"
                                                >
                                                    <i className="bi bi-x-lg"></i>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="btn btn-outline-primary"
                                                    onClick={() => startEdit(review)}
                                                    title="Editar"
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button
                                                    className="btn btn-outline-danger"
                                                    onClick={() => handleDelete(review.id)}
                                                    title="Eliminar"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {editingId === review.id ? (
                                    <textarea
                                        className="form-control"
                                        rows={3}
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        autoFocus
                                    />
                                ) : (
                                    <p className="mb-0 text-secondary">{review.texto || review.comentario}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
                            <button
                                className="btn btn-outline-secondary"
                                disabled={page <= 1 || status === 'loading'}
                                onClick={() => handlePageChange(page - 1)}
                            >
                                <i className="bi bi-chevron-left me-1"></i> Anterior
                            </button>
                            <span className="text-muted">
                                Página <strong>{page}</strong> de <strong>{totalPages}</strong>
                            </span>
                            <button
                                className="btn btn-outline-secondary"
                                disabled={page >= totalPages || status === 'loading'}
                                onClick={() => handlePageChange(page + 1)}
                            >
                                Siguiente <i className="bi bi-chevron-right ms-1"></i>
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Error Messages */}
            {deleteError && (
                <div className="alert alert-danger mt-3">
                    {Array.isArray(deleteError) ? deleteError.join(", ") : deleteError}
                </div>
            )}
        </div>
    );
}
