import { useDispatch, useSelector } from 'react-redux';
import { fetchManifest } from '../../reader/store/readerSlice';
import { selectIsAuthenticated } from '../../auth/store/authSlice';
import usePortada from '../../../shared/hooks/usePortada';
import useNotification from '../../auth/hooks/useNotification';
import BookCard from '../components/BookCard';

export default function BookCardContainer({
  libro,
  onAdd,
  onRemove,
  onRead,
  onDownload,
  showAdd = true,
  showRemove = false,
  showDownload = false,
}) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const portada = usePortada(libro);
  const { notification, showNotification, closeNotification } = useNotification();

  const handleRead = () => {
    if (!isAuthenticated) {
      showNotification("Debes iniciar sesión para leer libros");
      return;
    }
    if (onRead) onRead(libro);
    else dispatch(fetchManifest(libro.id));
  };

  return (
    <BookCard
      libro={libro}
      portada={portada}
      onAdd={onAdd}
      onRemove={onRemove}
      onRead={handleRead}
      onDownload={onDownload}
      showAdd={showAdd}
      showRemove={showRemove}
      showDownload={showDownload}
      notification={notification}
      onCloseNotification={closeNotification}
    />
  );
}
