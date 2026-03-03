import { Link } from "react-router-dom";
import NotificationModal from "../../../shared/components/NotificationModal";
import styles from "../styles/BookCard.module.css";

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

export default function BookCard({
  libro,
  portada,
  onAdd,
  onRemove,
  onRead,
  onDownload,
  showAdd = true,
  showRemove = false,
  showDownload = false,
  notification,
  onCloseNotification,
}) {
  return (
    <article className={styles.card}>
      <BookCover libro={libro} portada={portada} />

      <div className={styles.body}>
        <BookInfo libro={libro} />

        <div className={styles.actions}>
          <ActionButton
            onClick={onRead}
            variant="primary"
            icon="fa-book-open"
            label="Leer"
            fullWidth
          />

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

      {notification && (
        <NotificationModal
          message={notification.message}
          isOpen={notification.isOpen}
          onClose={onCloseNotification}
        />
      )}
    </article>
  );
}
