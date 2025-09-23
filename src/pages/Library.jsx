import { useEffect, useState, useMemo } from "react";
import BookCard from "../components/ui/BookCard";
import Pagination from "../components/ui/Pagination";
import { useBookshelf } from "../hooks/useBookshelf";
import NotificationModal from "../components/ui/NotificationModal";
import ReaderApp from "./ReaderApp";
import "../assets/styles/library.css";
export default function Biblioteca() {
  const { estanteria, handleRemoveBook, handleAddBook } = useBookshelf();
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const librosPagina = estanteria.slice(startIndex, endIndex);
  const totalPages = Math.ceil(estanteria.length / pageSize);

  const [notifications, setNotifications] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const libroLocal = useMemo(
    () => ({
      titulo: "El túnel",
      autor: "Ernesto Sabato",
      imagen: "/portadas/el_tunel_ernesto_sabato.jpg",
      url: "/libros/el_tunel_ernesto_sabato.epub",
    }),
    []
  );

  useEffect(() => {
    if (!estanteria.some((l) => l.titulo === libroLocal.titulo)) {
      handleAddBook(libroLocal);
    }
  }, [estanteria, handleAddBook, libroLocal]);

  const onRemove = (libro) => {
    const result = handleRemoveBook(libro);
    if (result) showNotification(result.message);
  };

  const showNotification = (msg) => {
    setNotifications((prev) => [...prev, msg]);
  };

  return (
    <main className="container my-5">
      <h1 className="mb-4"> Mi Biblioteca 📖</h1>

      <section>
        {selectedBook ? (
          <ReaderApp
            fileUrl={selectedBook.url}
            onClose={() => setSelectedBook(null)}
          />
        ) : (
          <>
            <div
              id="biblioteca-lista"
              className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-1"
            >
              {librosPagina.length === 0 ? (
                <p className="text-muted">Aún no has agregado libros.</p>
              ) : (
                librosPagina.map((libro, i) => (
                  <BookCard
                    key={i}
                    libro={libro}
                    onRemove={() => onRemove(libro)}
                    isInLibrary={true}
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
      </section>
    </main>
  );
}
