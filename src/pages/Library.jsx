import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookCard from "../components/ui/BookCard";
import Pagination from "../components/ui/Pagination";
import NotificationModal from "../components/ui/NotificationModal";
import {
  downloadBook
} from "../store/booksSlice";
import {
  fetchUserLibrary,
  removeBookFromLibrary,
  selectLibraryBooks,
  selectLibraryTotalPages,
  selectLibraryStatus
} from "../store/librarySlice";
import "../assets/styles/library.css";

export default function Biblioteca() {
  const dispatch = useDispatch();
  const books = useSelector(selectLibraryBooks);
  const totalPages = useSelector(selectLibraryTotalPages);
  const status = useSelector(selectLibraryStatus);

  const loading = status === 'loading';

  const [page, setPage] = useState(1);
  const pageSize = 20;

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    dispatch(fetchUserLibrary({ page, pageSize }));
  }, [dispatch, page]);

  const showNotification = (msg) => {
    setNotifications((prev) => [...prev, msg]);
  };

  const handleDownload = (book) => {
    dispatch(downloadBook({ id: book.id, titulo: book.titulo }))
      .unwrap()
      .then(() => showNotification(`Descarga iniciada: ${book.titulo}`))
      .catch((err) => showNotification(`Error al descargar: ${err}`));
  };

  const handleRemove = async (book) => {
    if (window.confirm(`¿Estás seguro de eliminar "${book.titulo}" de tu biblioteca?`)) {
      try {
        await dispatch(removeBookFromLibrary(book.id)).unwrap();
        showNotification(`"${book.titulo}" eliminado de la biblioteca`);
      } catch (error) {
        showNotification(`Error al eliminar: ${error}`);
      }
    }
  };




  return (
    <main className="container my-5">
      <h1 className="mb-4">Mi Biblioteca 📚</h1>



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
          <p className="text-muted">No hay libros disponibles en tu biblioteca.</p>
        ) : (
          books.map((libro, i) => (
            <BookCard
              key={i}
              libro={libro}
              showAdd={false}
              showRemove={true}
              showDownload={true}
              onRemove={handleRemove}
              onDownload={handleDownload}
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
    </main>
  );
}

