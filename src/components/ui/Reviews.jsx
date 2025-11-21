import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewsByBookId, selectReviews, selectReviewsStatus } from "../../store/reviewsSlice";

export default function Reviews({ bookId }) {
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviews);
  const status = useSelector(selectReviewsStatus);

  useEffect(() => {
    if (bookId) {
      dispatch(fetchReviewsByBookId(bookId));
    }
  }, [dispatch, bookId]);

  if (status === 'loading') {
    return <p>Cargando reseñas...</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Reseñas</h2>

      {reviews.length === 0 ? (
        <p>No hay reseñas todavía.</p>
      ) : (
        reviews.map((r) => (
          <div
            key={r.id || Math.random()}
            style={{
              marginBottom: "15px",
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
            }}
          >
            <strong>{r.usuarioNombre || "Usuario"}</strong>
            <p>{r.comentario}</p>
            {r.calificacion && <p>Calificación: {r.calificacion} ★</p>}
          </div>
        ))
      )}
    </div>
  );
}
