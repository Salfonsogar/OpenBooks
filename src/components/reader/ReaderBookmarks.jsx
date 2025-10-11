export default function ReaderBookmarks({ bookmarks, onAddBookmark, onGoToBookmark }) {
  return (
    <section>
      <h5>Marcadores</h5>
      {bookmarks.length === 0 ? (
        <p>No hay marcadores</p>
      ) : (
        bookmarks.map((cfi, i) => (
          <button
            key={i}
            className="btn-go-bookmark"
            onClick={() => onGoToBookmark(cfi)}
          >
            Ir al marcador {i + 1}
          </button>
        ))
      )}
      <button onClick={onAddBookmark} className="btn-add-bookmark">
        Añadir marcador
      </button>
    </section>
  );
}
