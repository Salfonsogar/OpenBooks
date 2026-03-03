import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookToLibrary, removeBookFromLibrary, fetchUserLibrary } from "../store/librarySlice";
import { selectIsAuthenticated } from "../../auth/store/authSlice";
import { fetchManifest } from "../../reader/store/readerSlice";
import { useCatalog } from "../hooks/useCatalog";
import Catalog from "../components/Catalog";

export default function CatalogContainer() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const libraryBooks = useSelector((state) => state.library.items);

  const [notifications, setNotifications] = useState([]);

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

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserLibrary({ page: 1, pageSize: 1000 }));
    }
  }, [dispatch, isAuthenticated]);

  const showNotification = (msg) => {
    setNotifications((prev) => [...prev, msg]);
  };

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

  const onRead = (libro) => {
    if (!isAuthenticated) {
      showNotification("Debes iniciar sesión para leer libros");
      return;
    }
    dispatch(fetchManifest(libro.id));
  };

  return (
    <Catalog
      query={query}
      autor={autor}
      setAutor={setAutor}
      categorias={categorias}
      page={page}
      setPage={setPage}
      showFilters={showFilters}
      setShowFilters={setShowFilters}
      books={books}
      totalPages={totalPages}
      loading={loading}
      allCategorias={allCategorias}
      topViewed={topViewed}
      topRated={topRated}
      history={history}
      handleSearch={handleSearch}
      handleAutorChange={handleAutorChange}
      handleCategoriaToggle={handleCategoriaToggle}
      clearFilters={clearFilters}
      activeFiltersCount={activeFiltersCount}
      isAuthenticated={isAuthenticated}
      libraryBooks={libraryBooks}
      onAdd={onAdd}
      onRemove={onRemove}
      onRead={onRead}
      notifications={notifications}
      setNotifications={setNotifications}
    />
  );
}
