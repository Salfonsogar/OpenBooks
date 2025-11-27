import { Link } from "react-router-dom";
import "../../assets/styles/BookCard.css";
import usePortada from "../../hooks/usePortada";
import { useDispatch } from "react-redux";
import { fetchManifest } from "../../store/readerSlice";

export default function BookCard({
  libro,
  onAdd,
  onRemove,
  onRead,
  onDownload,
  showAdd = true,
  showRemove = false,
  showDownload = false,
}) {
  const dispatch = useDispatch();
  const portada = usePortada(libro);

  const handleRead = () => {
    if (onRead) {
      onRead(libro);
    } else {
      dispatch(fetchManifest(libro.id));
    }
  };

  return (
    <div className="col">
      <div className="card h-100 shadow-sm d-flex flex-column">
        <Link to={`/book/${libro.id}`} className="flex-shrink-0">
          <img
            src={portada}
            className="card-img-top"
            alt={libro.titulo}
            style={{ cursor: "pointer" }}
          />
        </Link>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link
              to={`/book/${libro.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {libro.titulo}
            </Link>
          </h5>

          <p className="card-text text-secondary mb-2">{libro.autor}</p>

          <div className="mt-auto d-flex flex-wrap gap-2">
            {showRemove && (
              <button
                className="btn-eliminar flex-fill"
                onClick={() => onRemove(libro)}
              >
                Eliminar
              </button>
            )}

            {showAdd && (
              <button
                className="btn-leer flex-fill"
                onClick={() => onAdd(libro)}
              >
                Agregar
              </button>
            )}

            <button
              className="btn-leer flex-fill"
              onClick={handleRead}
            >
              Leer
            </button>

            {showDownload && (
              <button
                className="btn-leer flex-fill"
                onClick={() => onDownload(libro)}
              >
                Descargar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
