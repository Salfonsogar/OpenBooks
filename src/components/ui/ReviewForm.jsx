import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview, selectAddReviewStatus } from "../../store/reviewsSlice";

export default function ReviewForm({ bookId }) {
  const [comentario, setComentario] = useState("");
  const [rating, setRating] = useState(5);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const addStatus = useSelector(selectAddReviewStatus);

  if (!user) {
    return (
      <p style={{ marginTop: "20px", color: "gray" }}>
        Debes iniciar sesión para escribir una reseña.
      </p>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comentario.trim()) return;

    dispatch(addReview({
      bookId,
      userId: user.id,
      comment: comentario,
      rating
    })).then(() => {
      setComentario("");
      setRating(5);
      alert("Reseña enviada");
      // Optionally dispatch fetchReviewsByBookId to refresh the list immediately if optimistic update isn't enough
      // dispatch(fetchReviewsByBookId(bookId));
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <h3>Agregar reseña</h3>

      <div className="mb-3">
        <label>Calificación:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="form-select"
          style={{ width: 'auto', display: 'inline-block', marginLeft: '10px' }}
        >
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>{n} ★</option>
          ))}
        </select>
      </div>

      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Escribe tu reseña..."
        rows={4}
        style={{ width: "100%", padding: "10px" }}
        disabled={addStatus === 'loading'}
      />

      <button
        style={{ marginTop: "10px", padding: "10px 15px" }}
        disabled={addStatus === 'loading'}
      >
        {addStatus === 'loading' ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}
