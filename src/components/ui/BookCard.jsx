// BookCard.jsx
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchManifest } from "../../store/readerSlice";
import { selectIsAuthenticated } from "../../store/authSlice";
import usePortada from "../../hooks/usePortada";
import useNotification from "../../hooks/useNotification";
import NotificationModal from "./NotificationModal";
import styles from "../../assets/styles/BookCard.module.css";

/* ─────────────────────────────────────────
   Sub-components
───────────────────────────────────────── */
function BookCover({ libro, portada }) {
  return (
    <Link to={`/book/${libro.id}`} className={styles.coverLink} tabIndex={-1}>
      <img
        src={portada}
        alt={libro.titulo}
        className={styles.cover}
        loading="lazy"
      />
      <div className={styles.coverOverlay}>
        <i className="fas fa-eye" />
        Ver detalle
      </div>
    </Link>
  );
}

function BookInfo({ libro }) {
  return (
    <div className={styles.info}>
      <Link to={`/book/${libro.id}`} className={styles.titleLink}>
        <h3 className={styles.title}>{libro.titulo}</h3>
      </Link>
      <p className={styles.author}>
        <i className="fas fa-user-pen" />
        {libro.autor}
      </p>
    </div>
  );
}

function ActionButton({ onClick, variant = "primary", icon, label, fullWidth }) {
  return (
    <button
      className={`${styles.btn} ${styles[`btn--${variant}`]}${fullWidth ? ` ${styles['btn--full']}` : ''}`}
      onClick={onClick}
    >
      <i className={`fas ${icon}`} />
      <span>{label}</span>
    </button>
  );
}

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
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
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const portada = usePortada(libro);
  const { notification, showNotification, closeNotification } = useNotification();

  const handleRead = () => {
    if (!isAuthenticated) {
      showNotification("Debes iniciar sesión para leer libros");
      return;
    }
    if (onRead) onRead(libro);
    else dispatch(fetchManifest(libro.id));
  };

  return (
    <article className={styles.card}>
      <BookCover libro={libro} portada={portada} />

      <div className={styles.body}>
        <BookInfo libro={libro} />

        <div className={styles.actions}>
          {/* Primary row — always visible */}
          <ActionButton
            onClick={handleRead}
            variant="primary"
            icon="fa-book-open"
            label="Leer"
            fullWidth
          />

          {/* Secondary row — contextual actions */}
          {(showAdd || showDownload || showRemove) && (
            <div className={styles.actionsSecondary}>
              {showAdd && (
                <ActionButton
                  onClick={() => onAdd(libro)}
                  variant="ghost"
                  icon="fa-plus"
                  label="Agregar"
                />
              )}
              {showDownload && (
                <ActionButton
                  onClick={() => onDownload(libro)}
                  variant="ghost"
                  icon="fa-download"
                  label="Descargar"
                />
              )}
              {showRemove && (
                <ActionButton
                  onClick={() => onRemove(libro)}
                  variant="danger"
                  icon="fa-trash"
                  label="Eliminar"
                />
              )}
            </div>
          )}
        </div>
      </div>

      <NotificationModal
        message={notification.message}
        isOpen={notification.isOpen}
        onClose={closeNotification}
      />
    </article>
  );
}