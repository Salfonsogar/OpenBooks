import { useState } from "react";
import { useSelector } from "react-redux";

export default function BookInfo({ book }) {
  const [rating, setRating] = useState(0);

  // ---- OJO AQUÍ ----
  const user = useSelector((state) => state.auth.user);
  const isLogged = !!user;

  const handleRating = (value) => {
    if (!isLogged) {
      alert("Debes iniciar sesión para valorar el libro.");
      return;
    }
    setRating(value);
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h1>{book.titulo}</h1>
      <p><strong>Autor:</strong> {book.autor}</p>
      <p><strong>Descripción:</strong> {book.descripcion}</p>

      {book.portada && (
        <img
          src={`data:${book.portadaContentType};base64,${book.portada}`}
          alt="Portada"
          style={{ width: "200px", borderRadius: "8px" }}
        />
      )}

      <p><strong>Categorías:</strong> {book.categorias?.map(c => c.nombre).join(", ")}</p>

      <div style={{ marginTop: "10px" }}>
        <strong>Valorar: </strong>

        {/* Si está logueado → estrellas, si no, mensaje */}
        {isLogged ? (
          [1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              onClick={() => handleRating(n)}
              style={{
                cursor: "pointer",
                fontSize: "24px",
                color: n <= rating ? "#FFD700" : "#888",
              }}
            >
              ★
            </span>
          ))
        ) : (
          <p style={{ fontSize: "14px", color: "gray" }}>
            Inicia sesión para valorar este libro.
          </p>
        )}
      </div>
    </div>
  );
}

