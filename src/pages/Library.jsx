import { useDispatch, useSelector } from "react-redux";
import BookCard from "../components/ui/BookCard";
import Pagination from "../components/ui/Pagination";
import NotificationModal from "../components/ui/NotificationModal";
import ReaderApp from "./ReaderApp";
import {
  fetchCatalogBooks,
  selectCatalogBooks,
  selectCatalogTotalPages,
  selectCatalogStatus
} from "../store/booksSlice";
import "../assets/styles/library.css";
import useBookFromBase64 from "../hooks/useBookFromBase64";
import normalizeBook from "../utils/normalizeBook";

export default function Biblioteca() {
  const dispatch = useDispatch();
  const books = useSelector(selectCatalogBooks);
  const totalPages = useSelector(selectCatalogTotalPages);
  const status = useSelector(selectCatalogStatus);
  const loading = status === 'loading';

  const [page, setPage] = useState(1);
  const pageSize = 20;

  const [selectedBook, setSelectedBook] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const normalized = normalizeBook(selectedBook);
  // derive candidate from normalized fields to cover all variants
  const candidate = normalized
    ? normalized.ArchivoBase64 ?? normalized.archivo ?? normalized.archivoUrl ?? normalized.url ?? null
    : null;

  const preview = typeof candidate === "string" ? candidate.slice(0, 120) + (candidate.length > 120 ? "..." : "") : candidate;

  const fileUrl = useBookFromBase64(candidate);

  useEffect(() => {
    console.log("selectedBook:", selectedBook);
    console.log("candidate(preview):", preview);
  }, [selectedBook, preview]);

  useEffect(() => {
    if (!selectedBook) return;
    console.groupCollapsed("selectedBook debug:", selectedBook.titulo || selectedBook);
    console.log("original:", selectedBook);
    console.log("normalized:", normalized);
    console.log("fileUrl:", fileUrl);
    console.groupEnd();
  }, [selectedBook, normalized, fileUrl]);

  useEffect(() => {
    dispatch(fetchCatalogBooks({ query: "", page, pageSize, autor: "", categorias: [] }));
  }, [dispatch, page]);

  const showNotification = (msg) => {
    setNotifications((prev) => [...prev, msg]);
  };

  return (
    <main className="container my-5">
      <h1 className="mb-4">Mi Biblioteca 📚</h1>

      {selectedBook ? (
        <ReaderApp
          fileUrl={fileUrl}
          onClose={() => setSelectedBook(null)}
        />
      ) : (
        <>
          <div
            id="biblioteca-lista"
            className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3"
          >
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center w-100"
                style={{ minHeight: 200 }}
              >
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : books.length === 0 ? (
              <p className="text-muted">No hay libros disponibles en el catálogo local.</p>
            ) : (
              books.map((libro, i) => (
                <BookCard
                  key={i}
                  libro={libro} // pasamos todo el objeto
                  isInLibrary={true}
                  onRemove={() => showNotification(`${libro.titulo} eliminado`)}
                  onRead={(lb) => {
                    console.log('[Library] onRead handler libro recibido:', lb);
                    // calcular normalized y candidate inmediatamente para depuración
                    try {
                      const normalizedLocal = normalizeBook(lb);
                      const candidateLocal =
                        normalizedLocal?.ArchivoBase64 ??
                        normalizedLocal?.archivoBase64 ??
                        normalizedLocal?.archivo ??
                        normalizedLocal?.archivoUrl ??
                        normalizedLocal?.Url ??
                        null;
                      const previewLocal = typeof candidateLocal === "string" ? candidateLocal.slice(0, 120) + (candidateLocal.length > 120 ? "..." : "") : candidateLocal;
                      console.log('[Library][onRead] candidate (preview):', previewLocal, ' fullLength:', candidateLocal ? candidateLocal.length : 0);
                    } catch (err) {
                      console.error('[Library][onRead] error al calcular candidate:', err);
                    }

                    setSelectedBook(lb);
                  }}
                />
              ))
            )}
          </div>

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}

          <div className="toast-container">
            {notifications.map((msg, i) => (
              <NotificationModal
                key={i}
                message={msg}
                isOpen={true}
                onClose={() =>
                  setNotifications((prev) =>
                    prev.filter((_, idx) => idx !== i)
                  )
                }
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
