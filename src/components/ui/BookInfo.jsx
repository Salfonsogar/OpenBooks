import { useDispatch, useSelector } from "react-redux";
import StarRating from "./StarRating";
import { createRating, updateRating, selectUserRating } from "../../store/ratingsSlice";
import { selectIsAuthenticated } from "../../store/authSlice";

export default function BookInfo({ book }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRating = useSelector((state) => selectUserRating(state, book.id));

  const handleRate = async (puntuacion) => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para valorar libros");
      return;
    }

    try {
      if (userRating) {
        await dispatch(updateRating({ idLibro: book.id, puntuacion })).unwrap();
      } else {
        await dispatch(createRating({ idLibro: book.id, puntuacion })).unwrap();
      }
    } catch (error) {
      console.error("Error al valorar:", error);
      alert("Error al guardar la valoración");
    }
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h1>{book.titulo}</h1>
      <p><strong>Autor:</strong> {book.autor}</p>

      <div className="mb-2">
        <strong>Valoración promedio:</strong>
        <div className="mt-1">
          <StarRating
            rating={book.promedioValoraciones || 0}
            onRate={handleRate}
            readonly={false}
            size="1.2rem"
          />
          <span className="ms-2">({book.cantidadValoraciones || 0} valoraciones)</span>
        </div>
      </div>

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
