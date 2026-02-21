import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../assets/styles/Catalog.css";
import SearchBar from "../components/ui/SearchBar";
import Pagination from "../components/ui/Pagination";
import NotificationModal from "../components/ui/NotificationModal";
import TopSection from "../components/ui/TopSection";
import { useCatalog } from "../hooks/useCatalog";
import CatalogFilters from "../components/catalog/CatalogFilters";
import CatalogGrid from "../components/catalog/CatalogGrid";
import { addBookToLibrary, removeBookFromLibrary, fetchUserLibrary, selectLibraryBooks } from "../store/librarySlice";
import { selectIsAuthenticated } from "../store/authSlice";
import { fetchManifest } from "../store/readerSlice";

export default function Catalog() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const libraryBooks = useSelector(selectLibraryBooks);

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

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserLibrary({ page: 1, pageSize: 1000 }));
    }
  }, [dispatch, isAuthenticated]);

  const onAdd = async (libro) => {
    if (!isAuthenticated) {
      showNotification("Debes iniciar sesión para agregar libros a tu biblioteca");
      return;
    }

    try {
      await dispatch(addBookToLibrary(libro.id)).unwrap();
      showNotification(`Libro "${libro.titulo}" agregado a tu biblioteca`);
      dispatch(fetchUserLibrary({ page: 1, pageSize: 1000 }));
    } catch (error) {
      showNotification(`Error al agregar libro: ${error}`);
    }
  };

  const onRemove = async (libro) => {
    if (!isAuthenticated) {
      showNotification("Debes iniciar sesión");
      return;
    }

    try {
      await dispatch(removeBookFromLibrary(libro.id)).unwrap();
      showNotification(`Libro "${libro.titulo}" eliminado de tu biblioteca`);
      dispatch(fetchUserLibrary({ page: 1, pageSize: 1000 }));
    } catch (error) {
      showNotification(`Error al eliminar libro: ${error}`);
    }
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

      <>
        <SearchBar onSearch={handleSearch} history={history} />

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

        {/* Always show the catalog grid (paginated). If filters/search are active it will show filtered results. */}
        <CatalogGrid
          loading={loading}
          books={books}
          activeFiltersCount={activeFiltersCount}
          clearFilters={clearFilters}
          libraryBooks={libraryBooks}
          isAuthenticated={isAuthenticated}
          onAdd={onAdd}
          onRemove={onRemove}
          onRead={(libro) => dispatch(fetchManifest(libro.id))}
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
    </div>
  );
}