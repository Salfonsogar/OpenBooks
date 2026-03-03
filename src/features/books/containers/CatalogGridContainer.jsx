import { useDispatch, useSelector } from 'react-redux';
import { fetchManifest } from '../../reader/store/readerSlice';
import { selectIsAuthenticated } from '../../auth/store/authSlice';
import usePortada from '../../../shared/hooks/usePortada';
import useNotification from '../../auth/hooks/useNotification';
import CatalogGrid from '../components/CatalogGrid';

export default function CatalogGridContainer({
    loading,
    books,
    activeFiltersCount,
    clearFilters,
    libraryBooks = [],
    onAdd,
    onRemove,
    onRead,
}) {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const { notification, showNotification, closeNotification } = useNotification();

    const handleRead = (libro) => {
        if (!isAuthenticated) {
            showNotification("Debes iniciar sesión para leer libros");
            return;
        }
        if (onRead) onRead(libro);
        else dispatch(fetchManifest(libro.id));
    };

    return (
        <CatalogGrid
            loading={loading}
            books={books}
            activeFiltersCount={activeFiltersCount}
            clearFilters={clearFilters}
            libraryBooks={libraryBooks}
            isAuthenticated={isAuthenticated}
            onAdd={onAdd}
            onRemove={onRemove}
            onRead={handleRead}
            useContainer={true}
            notification={notification}
            closeNotification={closeNotification}
        />
    );
}
