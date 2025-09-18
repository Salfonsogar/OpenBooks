import BookCard from "../components/ui/BookCard";
import Pagination from "../components/ui/Pagination";
import { useLocalStorage } from "../hooks/useLocalStorage";
import NotificationModal from "../components/ui/NotificationModal";
import { useState } from "react";

export default function Biblioteca() {
  const [estanteria, setEstanteria] = useLocalStorage("estanteria", []);
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const librosPagina = estanteria.slice(startIndex, endIndex);
  const totalPages = Math.ceil(estanteria.length / pageSize);

  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleRemoveBook = (titulo) => {
    const updated = estanteria.filter((libro) => libro.titulo !== titulo);
    setEstanteria(updated);
    setMessage("Libro eliminado de la estantería 🗑️");
    setOpen(true);
  };

  return (
    <main className="container my-5">
      <h1 className="mb-4">📖 Mi Biblioteca</h1>
      <p className="text-muted">
        Aquí encontrarás los libros que has guardado.
      </p>

      <section>
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
                onRemove={() => handleRemoveBook(libro.titulo)}
                isInLibrary={true}
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

        <NotificationModal
          message={message}
          isOpen={open}
          onClose={() => setOpen(false)}
        />
      </section>
    </main>
  );
}
