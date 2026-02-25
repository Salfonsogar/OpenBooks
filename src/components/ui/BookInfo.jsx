// BookInfo.jsx
import { useDispatch, useSelector } from "react-redux";
import { createRating, updateRating, selectUserRating } from "../../store/ratingsSlice";
import { selectIsAuthenticated } from "../../store/authSlice";
import StarRating from "./StarRating";
import NotificationModal from "./NotificationModal";
import useNotification from "../../hooks/useNotification";
import { useBookRating } from "../../hooks/useBookRating";
import styles from "../../assets/styles/BookInfo.module.css";

/* ─────────────────────────────────────────
   Sub-components
───────────────────────────────────────── */
function CoverImage({ portada, portadaContentType, titulo }) {
  if (!portada) return null;
  return (
    <div className={styles.coverWrap}>
      <img
        src={`data:${portadaContentType};base64,${portada}`}
        alt={`Portada de ${titulo}`}
        className={styles.cover}
      />
    </div>
  );
}

function MetaRow({ icon, label, children }) {
  return (
    <div className={styles.metaRow}>
      <span className={styles.metaLabel}>
        <i className={`fas ${icon}`} />
        {label}
      </span>
      <span className={styles.metaValue}>{children}</span>
    </div>
  );
}

function CategoryList({ categorias }) {
  if (!categorias?.length) return <span className={styles.metaEmpty}>Sin categorías</span>;
  return (
    <div className={styles.categories}>
      {categorias.map((c) => (
        <span key={c.id ?? c.nombre} className={styles.categoryChip}>
          {c.nombre}
        </span>
      ))}
    </div>
  );
}

function RatingBlock({ book, onRate }) {
  return (
    <div className={styles.ratingBlock}>
      <div className={styles.ratingRow}>
        <StarRating
          rating={book.promedioValoraciones || 0}
          onRate={onRate}
          readonly={false}
          size="1.3rem"
        />
        <span className={styles.ratingCount}>
          {book.promedioValoraciones
            ? book.promedioValoraciones.toFixed(1)
            : "—"}
          <span className={styles.ratingTotal}>
            ({book.cantidadValoraciones || 0} valoraciones)
          </span>
        </span>
      </div>
      <p className={styles.ratingHint}>
        <i className="fas fa-star" /> Haz clic en las estrellas para valorar
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
export default function BookInfo({ book }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRating = useSelector((state) => selectUserRating(state, book.id));
  const { notification, showNotification, closeNotification } = useNotification();

  const handleRate = async (puntuacion) => {
    if (!isAuthenticated) {
      showNotification("Debes iniciar sesión para valorar libros");
      return;
    }
    try {
      const action = userRating
        ? updateRating({ idLibro: book.id, puntuacion })
        : createRating({ idLibro: book.id, puntuacion });
      await dispatch(action).unwrap();
    } catch {
      showNotification("Error al guardar la valoración");
    }
  };

  return (
    <>
      <article className={styles.card}>
        {/* Content */}
        <div className={styles.content}>
          {/* Header */}
          <header className={styles.header}>
            <h1 className={styles.title}>{book.titulo}</h1>
            <MetaRow icon="fa-user-pen" label="Autor">
              {book.autor}
            </MetaRow>
          </header>

          <div className={styles.divider} />

          {/* Rating */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Valoración</h2>
            <RatingBlock book={book} onRate={handleRate} />
          </section>

          <div className={styles.divider} />

          {/* Description */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Descripción</h2>
            <p className={styles.description}>{book.descripcion}</p>
          </section>

          <div className={styles.divider} />

          {/* Categories */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Categorías</h2>
            <CategoryList categorias={book.categorias} />
          </section>
        </div>
      </article>

      <NotificationModal
        message={notification.message}
        isOpen={notification.isOpen}
        onClose={closeNotification}
      />
    </>
  );
}