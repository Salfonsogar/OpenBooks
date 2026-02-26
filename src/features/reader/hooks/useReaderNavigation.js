import { useDispatch } from 'react-redux';
import { goNext, goPrevious } from '../store/readerSlice';

export function useReaderNavigation(iframeRef, hasNext, hasPrevious, setIsNavigatingBack) {
    const dispatch = useDispatch();

    const handleNextPage = () => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            const win = iframeRef.current.contentWindow;
            const { scrollX, innerWidth } = win;
            const scrollWidth = win.document.body.scrollWidth;

            if (scrollX + innerWidth < scrollWidth - 10) {
                win.scrollBy({ left: innerWidth, behavior: 'smooth' });
            } else if (hasNext) {
                dispatch(goNext());
            }
        }
    };

    const handlePrevPage = () => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            const win = iframeRef.current.contentWindow;
            const { scrollX, innerWidth } = win;

            if (scrollX > 10) {
                win.scrollBy({ left: -innerWidth, behavior: 'smooth' });
            } else if (hasPrevious) {
                setIsNavigatingBack(true);
                dispatch(goPrevious());
            }
        }
    };

    return { handleNextPage, handlePrevPage };
}