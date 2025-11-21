import { useState } from "react";
import { useSelector } from "react-redux";

export default function ReviewForm({ bookId }) {
  const [comentario, setComentario] = useState("");

  const user = useSelector((state) => state.auth.user);
  const isLogged = !!user;

  // Si NO está logueado → no mostrar formulario
  if (!isLogged) {
    return (
      <p style={{ marginTop: "20px", color: "gray" }}>
        Debes iniciar sesión para escribir una reseña.
      </p>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comentario.trim()) return;

    try {
      await fetch("http://localhost:5181/api/Resena", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          libroId: bookId,
          usuarioId: user.id, // porque tienen roles y usuario en Redux
          comentario
        }),
      });

      setComentario("");
      alert("Reseña enviada");
    } catch (err) {
      console.error("Error enviando reseña:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <h3>Agregar reseña</h3>

      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Escribe tu reseña..."
        rows={4}
        style={{ width: "100%", padding: "10px" }}
      />

      <button style={{ marginTop: "10px", padding: "10px 15px" }}>
        Enviar
      </button>
    </form>
  );
}
