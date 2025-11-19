import { useEffect, useState } from "react";
import "../assets/styles/Catalog.css";
import { useLocalStorageValue } from "../hooks/useLocalStorage";
import { useBookshelf } from "../hooks/useBookshelf";
import SearchBar from "../components/ui/SearchBar";
import BookCard from "../components/ui/BookCard";
import Pagination from "../components/ui/Pagination";
import NotificationModal from "../components/ui/NotificationModal";
import { updateLocalStorage } from "../utils/updateLocalStorage";
import ReaderApp from "./ReaderApp";
import { getBooks } from "../services/bookProvider";
import { getCategories } from "../services/categoryService";
import useBookFromBase64 from "../hooks/useBookFromBase64";

export default function Catalog() {
  const [query, setQuery] = useState("");
  const [autor, setAutor] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [allCategorias, setAllCategorias] = useState([]);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false); // Toggle filtros
  const pageSize = 20;

  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const { estanteria, handleAddBook, handleRemoveBook } = useBookshelf();
  const history = useLocalStorageValue("historial", []);

  const [notifications, setNotifications] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const fileUrl = useBookFromBase64(
    selectedBook?.ArchivoBase64 ?? selectedBook?.url ?? selectedBook?.Url
  );
  useEffect(() => {
    getCategories(1, 50).then(setAllCategorias);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, totalPages } = await getBooks(
          null,
          query,
          page,
          pageSize,
          autor,
          categorias
        );
        setBooks(data);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error al obtener libros:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query, autor, categorias, page]);

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

  const handleAutorChange = (e) => {
    setAutor(e.target.value);
    setPage(1);
  };

  const handleCategoriaToggle = (categoryName) => {
    setCategorias(prev => {
      if (prev.includes(categoryName)) {
        return prev.filter(c => c !== categoryName);
      } else {
        return [...prev, categoryName];
      }
    });
    setPage(1);
  };

  const clearFilters = () => {
    setAutor("");
    setCategorias([]);
    setPage(1);
  };

  const activeFiltersCount = (autor ? 1 : 0) + categorias.length;

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

          {showFilters && (
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title mb-4">
                  <i className="bi bi-sliders me-2"></i>
                  Refina tu búsqueda
                </h5>

                <div className="row g-4">
                  
                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      <i className="bi bi-person me-2 text-primary"></i>
                      Filtrar por Autor
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-search"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ej: Gabriel García Márquez"
                        value={autor}
                        onChange={handleAutorChange}
                      />
                      {autor && (
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => {
                            setAutor("");
                            setPage(1);
                          }}
                        >
                          <i className="bi bi-x"></i>
                        </button>
                      )}
                    </div>
                    {autor && (
                      <small className="text-success mt-1 d-block">
                        <i className="bi bi-check-circle me-1"></i>
                        Filtrando por: <strong>{autor}</strong>
                      </small>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      <i className="bi bi-tag me-2 text-success"></i>
                      Categorías
                      {categorias.length > 0 && (
                        <span className="badge bg-success ms-2">
                          {categorias.length} seleccionada{categorias.length !== 1 ? 's' : ''}
                        </span>
                      )}
                    </label>
                    
                    <div className="dropdown">
                      <button
                        className="btn btn-outline-secondary w-100 text-start d-flex justify-content-between align-items-center"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        <span>
                          {categorias.length === 0 
                            ? "Selecciona categorías..." 
                            : `${categorias.length} categoría${categorias.length !== 1 ? 's' : ''} seleccionada${categorias.length !== 1 ? 's' : ''}`
                          }
                        </span>
                        <i className="bi bi-chevron-down"></i>
                      </button>
                      
                      <div 
                        className="dropdown-menu w-100 p-3" 
                        style={{ maxHeight: '300px', overflowY: 'auto' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {allCategorias.length === 0 ? (
                          <div className="text-center w-100 py-5">
                            <i className="bi bi-inbox fs-4 d-block mb-2"></i>
                            <small>No hay categorías disponibles</small>
                          </div>
                        ) : (
                          allCategorias.map((cat) => {
                            const categoryName = cat.nombre || cat.Nombre;
                            const categoryId = cat.id || cat.Id || categoryName;
                            const isSelected = categorias.includes(categoryName);
                            
                            return (
                              <div 
                                key={categoryId} 
                                className="form-check mb-2"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`cat-${categoryId}`}
                                  checked={isSelected}
                                  onChange={() => handleCategoriaToggle(categoryName)}
                                />
                                <label 
                                  className="form-check-label w-100" 
                                  htmlFor={`cat-${categoryId}`}
                                  style={{ cursor: 'pointer' }}
                                >
                                  {categoryName}
                                </label>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                    {categorias.length > 0 && (
                      <div className="mt-2 d-flex flex-wrap gap-2">
                        {categorias.map((cat) => (
                          <span 
                            key={cat} 
                            className="badge bg-success d-inline-flex align-items-center gap-1"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleCategoriaToggle(cat)}
                          >
                            {cat}
                            <i className="bi bi-x"></i>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {activeFiltersCount > 0 && (
                  <div className="mt-3 pt-3 border-top">
                    <small className="text-muted">
                      <i className="bi bi-info-circle me-1"></i>
                      <strong>{activeFiltersCount}</strong> filtro{activeFiltersCount !== 1 ? 's' : ''} activo{activeFiltersCount !== 1 ? 's' : ''}
                    </small>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-1">
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center w-100"
                style={{ minHeight: 200 }}
              >
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : books.length === 0 ? (
              <div className="text-center w-100 py-5">
                <i className="bi bi-search text-muted" style={{ fontSize: '4rem' }}></i>
                <h4 className="mt-3 text-muted">No se encontraron libros</h4>
                <p className="text-muted">
                  Intenta ajustar los filtros o realizar otra búsqueda
                </p>
                {activeFiltersCount > 0 && (
                  <button 
                    className="btn btn-outline-primary mt-2"
                    onClick={clearFilters}
                  >
                    <i className="bi bi-arrow-counterclockwise me-2"></i>
                    Limpiar filtros
                  </button>
                )}
              </div>
            ) : (
              books.map((libro, i) => (
                <BookCard
                  key={i}
                  libro={{
                    ...libro,
                    Portada: libro.PortadaBase64
                      ? `data:image/png;base64,${libro.PortadaBase64}`
                      : "/placeholder.png",
                  }}
                  isInLibrary={estanteria.some(
                    (l) =>
                      l.titulo === libro.titulo && l.autor === libro.autor
                  )}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  onRead={() => setSelectedBook(libro)}
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
    </div>
  );
}