import { useState } from "react";
import "../assets/styles/Catalog.css";
import { useBookshelf } from "../hooks/useBookshelf";
import SearchBar from "../components/ui/SearchBar";
import Pagination from "../components/ui/Pagination";
import NotificationModal from "../components/ui/NotificationModal";
import ReaderApp from "./ReaderApp";
import useBookFromBase64 from "../hooks/useBookFromBase64";
import TopSection from "../components/ui/TopSection";
import { useCatalog } from "../hooks/useCatalog";
import CatalogFilters from "../components/catalog/CatalogFilters";
import CatalogGrid from "../components/catalog/CatalogGrid";

export default function Catalog() {
  // Custom hook for catalog logic
  const {
    query,
    autor,
    setAutor,
    categorias,
    page,
    setPage,
    showFilters,
    setShowFilters,
    books,
    totalPages,
    loading,
    allCategorias,
    topViewed,
    topRated,
    history,
    handleSearch,
    handleAutorChange,
    handleCategoriaToggle,
    clearFilters,
    activeFiltersCount
  } = useCatalog();

  // Bookshelf logic
  const { estanteria, handleAddBook, handleRemoveBook } = useBookshelf();

  // Local UI state
  const [notifications, setNotifications] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const fileUrl = useBookFromBase64(
    selectedBook?.ArchivoBase64 ?? selectedBook?.url ?? selectedBook?.Url
  );

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
      <div className="mb-4">
        <h2 className="text-center mb-3">
          <i className="bi bi-book me-2"></i>
          Catálogo de Libros
        </h2>
        <p className="text-center text-muted">
          Explora nuestra colección y encuentra tu próxima lectura
        </p>
      </div>

      {selectedBook ? (
        <ReaderApp
          fileUrl={fileUrl}
          onClose={() => setSelectedBook(null)}
        />
      ) : (
        <>
          <SearchBar onSearch={handleSearch} history={history} />

          {!query && !autor && categorias.length === 0 && (
            <>
              <TopSection
                title="Más Vistos"
                icon="bi-eye"
                books={topViewed}
                estanteria={estanteria}
                onAdd={onAdd}
                onRemove={onRemove}
                onRead={(libro) => setSelectedBook(libro)}
              />
              <TopSection
                title="Más valorados"
                icon="bi-star"
                books={topRated}
                estanteria={estanteria}
                onAdd={onAdd}
                onRemove={onRemove}
                onRead={(libro) => setSelectedBook(libro)}
              />
            </>
          )}

          <div className="d-flex justify-content-between align-items-center mb-3">
            <button
              className="button"
              onClick={() => setShowFilters(!showFilters)}
            >
              <i className={`bi bi-funnel${showFilters ? '-fill' : ''} me-2`}></i>
              Filtros Avanzados
              {activeFiltersCount > 0 && (
                <span className="badge bg-danger ms-2">{activeFiltersCount}</span>
              )}
            </button>

            {activeFiltersCount > 0 && (
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={clearFilters}
              >
                <i className="bi bi-x-circle me-1"></i>
                Limpiar filtros
              </button>
            )}
          </div>

          <CatalogFilters
            showFilters={showFilters}
            activeFiltersCount={activeFiltersCount}
            clearFilters={clearFilters}
            autor={autor}
            handleAutorChange={handleAutorChange}
            setAutor={setAutor}
            setPage={setPage}
            categorias={categorias}
            allCategorias={allCategorias}
            handleCategoriaToggle={handleCategoriaToggle}
          />

          <CatalogGrid
            loading={loading}
            books={books}
            activeFiltersCount={activeFiltersCount}
            clearFilters={clearFilters}
            estanteria={estanteria}
            onAdd={onAdd}
            onRemove={onRemove}
            onRead={(libro) => setSelectedBook(libro)}
          />

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
    </div>
  );
}