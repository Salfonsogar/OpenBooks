import { useEffect, useState } from "react";

export default function Reviews({ bookId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await fetch(`http://localhost:5181/api/Resena/libro/${bookId}`);
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Error obteniendo reseñas:", err);
      }
    };

    getReviews();
  }, [bookId]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Reseñas</h2>

      {reviews.length === 0 ? (
        <p>No hay reseñas todavía.</p>
      ) : (
        reviews.map((r) => (
          <div
            key={r.id}
            style={{
              marginBottom: "15px",
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
            }}
          >
            <strong>{r.usuarioNombre || "Usuario"}</strong>
            <p>{r.comentario}</p>
          </div>
        ))
      )}
    </div>
  );
}
