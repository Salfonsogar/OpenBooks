import "../../assets/styles/BookCard.css";
import usePortada from "../../hooks/usePortada";
export default function BookCard({
  libro,
  onAdd,
  onRemove,
  isInLibrary,
  onRead,
}) {
  const portada = usePortada(libro);

  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <img
          src={portada}
          className="card-img-top"
          alt={libro.titulo}
        />
        <div className="card-body">
          <h5 className="card-title">{libro.titulo}</h5>
          <p className="card-text text-secondary">{libro.autor}</p>

          {isInLibrary ? (
            <button
              className="btn-eliminar"
              onClick={() => onRemove(libro)}
            >
              Eliminar
            </button>
          ) : (
            <button
              className="btn-leer"
              onClick={() => onAdd(libro)}
            >
              Agregar
            </button>
          )}
          <button className="btn-leer" onClick={() => onRead(libro)}>
            Leer en línea
          </button>
        </div>
      </div>
    </div>
  );
}
