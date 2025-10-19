import { useEffect, useState } from "react";
import BookCard from "../components/ui/BookCard";
import Pagination from "../components/ui/Pagination";
import NotificationModal from "../components/ui/NotificationModal";
import ReaderApp from "./ReaderApp";
import { getBooks } from "../services/bookProvider";
import "../assets/styles/library.css";

export default function Biblioteca() {
  const [books, setBooks] = useState([]);        
  const [loading, setLoading] = useState(false); 
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const [notifications, setNotifications] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const cargarLibros = async () => {
      setLoading(true);
      try {
        const { data, totalPages } = await getBooks("json", "", page, pageSize);
        setBooks(data);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error al cargar libros:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarLibros();
  }, [page]);

  const showNotification = (msg) => {
    setNotifications((prev) => [...prev, msg]);
  };

  return (
    <main className="container my-5">
      <h1 className="mb-4">Mi Biblioteca 📚</h1>

      {selectedBook ? (
        <ReaderApp
          fileUrl={selectedBook.url}
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
                  libro={libro}
                  isInLibrary={true}
                  onRemove={() => showNotification(`${libro.titulo} eliminado`)}
                  onRead={(libro) => setSelectedBook(libro)}
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
