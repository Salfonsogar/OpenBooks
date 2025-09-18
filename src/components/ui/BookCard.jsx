import "../../assets/styles/BookCard.css";

export default function BookCard({ libro, onAdd, onRemove, isInLibrary }) {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <img src={libro.imagen} className="card-img-top" alt={libro.titulo} />
        <div className="card-body">
          <h5 className="card-title">{libro.titulo}</h5>
          <p className="card-text text-secondary">{libro.autor}</p>

          {isInLibrary ? (
            <button
              className="btn btn-sm btn-eliminar"
              onClick={() => onRemove(libro)}
            >
              Eliminar
            </button>
          ) : (
            <button
              className="btn btn-sm btn-leer"
              onClick={() => onAdd(libro)}
            >
              Leer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
