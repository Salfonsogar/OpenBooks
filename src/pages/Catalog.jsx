import { useState } from "react";
import "../assets/styles/Catalog.css";
import { useLocalStorageValue } from "../hooks/useLocalStorage";
import { useBooks } from "../hooks/useBooks";
import { useBookshelf } from "../hooks/useBookshelf";
import SearchBar from "../components/ui/SearchBar";
import BookCard from "../components/ui/BookCard";
import Pagination from "../components/ui/Pagination";
import NotificationModal from "../components/ui/NotificationModal";
import { updateLocalStorage } from "../utils/updateLocalStorage";

export default function Catalog() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { estanteria, handleAddBook, handleRemoveBook } = useBookshelf();
  const history = useLocalStorageValue("historial", []);
  const { books, totalPages, loading } = useBooks(query, page, pageSize);

  const [notifications, setNotifications] = useState([]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    const normalized = newQuery.trim().toLowerCase();
    const normalizedHistory = Array.isArray(history) ? history : [];

    if (!normalizedHistory.map((h) => h.toLowerCase()).includes(normalized)) {
      updateLocalStorage(
        "historial",
        [...normalizedHistory, newQuery].slice(-5)
      );
    }
  };

  const onAdd = (libro) => {
    const result = handleAddBook(libro);
    if (result) showNotification(result.message);
  };

  const onRemove = (libro) => {
    const result = handleRemoveBook(libro);
    if (result) showNotification(result.message);
  };

  const showNotification = (msg) => {
    setNotifications((prev) => [...prev, msg]);
  };

  return (
    <div className="container my-5">
      <div className="card shadow rounded-3 p-4">
        <h2 className="mb-4 text-center">Buscar Libros</h2>

        <SearchBar onSearch={handleSearch} history={history} />

        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-1">
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center w-100"
              style={{ minHeight: 200 }}
            >
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            books.map((libro, i) => (
              <BookCard
                key={i}
                libro={libro}
                isInLibrary={estanteria.some(
                  (l) => l.titulo === libro.titulo && l.autor === libro.autor
                )}
                onAdd={onAdd}
                onRemove={onRemove}
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
      </div>

      <div className="toast-container">
        {notifications.map((msg, i) => (
          <NotificationModal
            key={i}
            message={msg}
            isOpen={true}
            onClose={() =>
              setNotifications((prev) => prev.filter((_, idx) => idx !== i))
            }
          />
        ))}
      </div>
    </div>
  );
}
