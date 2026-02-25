import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookDetail, downloadBook, selectCurrentBook, selectBookStatus, clearCurrentBook } from '../store/booksSlice';
import BookInfo from '../components/ui/BookInfo';
import Reviews from '../components/ui/Reviews';
import { selectAuthUser, selectIsAuthenticated } from '../store/authSlice';
// import { selectBookReviews } from '../store/reviewsSlice';
export default function BookPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const book = useSelector(selectCurrentBook);
    // const reviews = useSelector(selectBookReviews); // No longer needed here
    const status = useSelector(selectBookStatus);
    const user = useSelector(selectAuthUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        if (id) {
            dispatch(fetchBookDetail(id));
        }
        return () => {
            dispatch(clearCurrentBook());
        };
    }, [dispatch, id]);

    const handleDownload = () => {
        if (!isAuthenticated) {
            alert('Debes iniciar sesión para descargar libros');
            return;
        }
        if (book) {
            dispatch(downloadBook({ id: book.id, titulo: book.titulo }));
        }
    };

    if (status === 'loading') {
        return <div className="container mt-5">Cargando libro...</div>;
    }

    if (status === 'failed') {
        return <div className="container mt-5">Error al cargar el libro. Asegúrate de estar logueado.</div>;
    }

    if (!book) {
        return <div className="container mt-5">Libro no encontrado</div>;
    }

    return (
        <div className="container mt-5">
            <BookInfo book={book} />
            <hr />
            <h3 className="mb-4">Reseñas ({book.resenas ? book.resenas.length : 0})</h3>
            <Reviews
                bookId={book.id}
                reviews={book.resenas || []}
                onReviewChange={() => dispatch(fetchBookDetail(id))}
            />
        </div>
    );
}
