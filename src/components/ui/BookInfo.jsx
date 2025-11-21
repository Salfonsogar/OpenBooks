import { useSelector } from "react-redux";

export default function BookInfo({ book }) {
  // Removed local rating logic as it is now part of the ReviewForm

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
    </div>
  );
}

