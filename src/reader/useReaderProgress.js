import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { goToIndex } from '../store/readerSlice';

export function useReaderProgress(readerBookId, manifest, currentIndex) {
    const dispatch = useDispatch();

    // cargar progreso guardado al inicio
    useEffect(() => {
        if (readerBookId && manifest) {
            const savedIndex = localStorage.getItem(`progress-${readerBookId}`);
            if (savedIndex !== null) {
                const index = parseInt(savedIndex, 10);
                if (!isNaN(index) && index >= 0 && index < (manifest.readingOrder?.length || 0)) {
                    if (index !== currentIndex) {
                        dispatch(goToIndex(index));
                    }
                }
            }
        }
    }, [readerBookId, manifest]);

    // guardar progreso cuando cambia la página
    useEffect(() => {
        if (readerBookId && currentIndex !== undefined) {
            localStorage.setItem(`progress-${readerBookId}`, currentIndex);
        }
    }, [readerBookId, currentIndex]);
}