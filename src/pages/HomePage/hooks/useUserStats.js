import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUserLibrary, selectLibraryBooks } from '../../../store/librarySlice';
import { fetchSancionesPorUsuarioAsync, selectSanciones } from '../../../store/sancionesSlice';
import { selectAuthUser } from '../../../store/authSlice';

export function useUserStats() {
    const dispatch = useDispatch();
    const user = useSelector(selectAuthUser);
    const libraryBooks = useSelector(selectLibraryBooks);
    const sanciones = useSelector(selectSanciones);

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchUserLibrary({ page: 1, pageSize: 100 }));
            dispatch(fetchSancionesPorUsuarioAsync(user.id));
        }
    }, [dispatch, user?.id]);

    const count = (arr) => (Array.isArray(arr) ? arr.length : 0);

    return {
        stats: {
            biblioteca: count(libraryBooks),
            sanciones: count(sanciones),
        },
    };
}
