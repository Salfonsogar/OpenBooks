import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookById, selectCurrentBook, selectBookStatus, clearCurrentBook } from '../store/booksSlice';
import BookInfo from '../components/ui/BookInfo';
import Reviews from '../components/ui/Reviews';
import ReviewForm from '../components/ui/ReviewForm';
import { selectAuthUser } from '../store/authSlice';

export default function BookPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const book = useSelector(selectCurrentBook);
    const status = useSelector(selectBookStatus);
    const user = useSelector(selectAuthUser);

    useEffect(() => {
        if (id) {
            dispatch(fetchBookById(id));
        }
        return () => {
            dispatch(clearCurrentBook());
        };
    }, [dispatch, id]);

    if (status === 'loading') {
        return <div className="container mt-5">Cargando libro...</div>;
    }

    if (!book) {
        return <div className="container mt-5">Libro no encontrado</div>;
    }

    return (
        <div className="container mt-5">
            <BookInfo book={book} />
            <hr />
            <Reviews bookId={book.id} />
            {user && <ReviewForm bookId={book.id} />}
        </div>
    );
}
