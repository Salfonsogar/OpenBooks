import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectAllUsers, fetchUsersAsync } from '../../../store/usersSlice';
import { selectAllCategories, fetchCategories } from '../../../store/categoriesSlice';
import { selectAllDenuncias, fetchDenunciasAsync } from '../../../store/denunciasSlice';
import { selectAllSugerencias, fetchSugerenciasAsync } from '../../../store/sugerenciasSlice';
import { selectAllBooks, fetchAllBooksAsync } from '../../../store/booksSlice';
import { selectAllSanciones, fetchAllSancionesAsync } from '../../../store/sancionesSlice';

export function useAdminStats() {
    const dispatch = useDispatch();

    const users = useSelector(selectAllUsers);
    const categories = useSelector(selectAllCategories);
    const denuncias = useSelector(selectAllDenuncias);
    const sugerencias = useSelector(selectAllSugerencias);
    const libros = useSelector(selectAllBooks);
    const sanciones = useSelector(selectAllSanciones);

    useEffect(() => {
        dispatch(fetchUsersAsync());
        dispatch(fetchCategories());
        dispatch(fetchDenunciasAsync());
        dispatch(fetchSugerenciasAsync());
        dispatch(fetchAllBooksAsync());
        dispatch(fetchAllSancionesAsync());
    }, [dispatch]);

    const count = (arr) => (Array.isArray(arr) ? arr.length : 0);

    return {
        stats: {
            libros: count(libros),
            usuarios: count(users),
            categorias: count(categories),
            sanciones: count(sanciones),
            denuncias: count(denuncias),
            sugerencias: count(sugerencias),
        },
    };
}