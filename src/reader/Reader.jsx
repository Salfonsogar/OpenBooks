import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchResource,
    goToIndex,
    closeReader,
    selectReaderBookId,
    selectReaderManifest,
    selectCurrentIndex,
    selectCurrentContent,
    selectHasNext,
    selectHasPrevious,
    selectReaderStatus
} from '../store/readerSlice';

import { useReaderProgress } from './useReaderProgress';
import { useReaderSettings } from './useReaderSettings';
import { useIframeStyles } from './useIframeStyles';
import { useReaderNavigation } from './useReaderNavigation';
import { useReaderBookmarks } from './useReaderBookmarks';
import { useReaderHighlights } from './useReaderHighlights';

import ReaderHeader from './ReaderHeader';
import ReaderSettingsPanel from './ReaderSettingsPanel';
import ReaderTocSidebar from './ReaderTocSidebar';
import ReaderBookmarksSidebar from './ReaderBookmarksSidebar';
import ReaderHighlightMenu from './ReaderHighlightMenu';
import ReaderContent from './ReaderContent';
import ReaderFooter from './ReaderFooter';

export default function Reader() {
    const dispatch = useDispatch();

    const readerBookId = useSelector(selectReaderBookId);
    const manifest = useSelector(selectReaderManifest);
    const currentIndex = useSelector(selectCurrentIndex);
    const currentContent = useSelector(selectCurrentContent);
    const hasNext = useSelector(selectHasNext);
    const hasPrevious = useSelector(selectHasPrevious);
    const status = useSelector(selectReaderStatus);

    const [iframeSrc, setIframeSrc] = useState('');
    const [isNavigatingBack, setIsNavigatingBack] = useState(false);
    const [showToc, setShowToc] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showBookmarks, setShowBookmarks] = useState(false);

    useReaderProgress(readerBookId, manifest, currentIndex);

    const {
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked
    } = useReaderBookmarks(readerBookId);

    const {
        fontSize,
        lineHeight,
        marginMode,
        theme,
        setLineHeight,
        setMarginMode,
        setTheme,
        increaseFontSize,
        decreaseFontSize
    } = useReaderSettings();

    const { iframeRef, applyStyles } = useIframeStyles(
        iframeSrc,
        fontSize,
        lineHeight,
        marginMode,
        theme,
        isNavigatingBack,
        setIsNavigatingBack
    );

    const {
        highlights,
        selectionMenu,
        addHighlight,
        removeHighlight,
        setSelectionMenu
    } = useReaderHighlights(readerBookId, iframeRef, currentIndex);

    const { handleNextPage, handlePrevPage } = useReaderNavigation(
        iframeRef,
        hasNext,
        hasPrevious,
        setIsNavigatingBack
    );

    useEffect(() => {
        if (manifest && manifest.readingOrder && manifest.readingOrder[currentIndex]) {
            const resource = manifest.readingOrder[currentIndex];
            dispatch(fetchResource({
                bookId: readerBookId,
                resourcePath: resource.href
            }));
        }
    }, [dispatch, manifest, currentIndex, readerBookId]);

    useEffect(() => {
        if (currentContent) {
            setIframeSrc(currentContent);
        }
    }, [currentContent]);

    const handleClose = () => {
        dispatch(closeReader());
    };

    const handleTocClick = (href) => {
        if (manifest && manifest.readingOrder) {
            const index = manifest.readingOrder.findIndex(item => item.href === href);
            if (index !== -1) {
                dispatch(goToIndex(index));
                setShowToc(false);
            }
        }
    };

    const handleIndexChange = (index) => {
        dispatch(goToIndex(index));
    };

    if (!manifest || !manifest.readingOrder) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status"></div>
                    <h5>Cargando libro...</h5>
                </div>
            </div>
        );
    }

    const totalPages = manifest.readingOrder.length;

    return (
        <div className="reader-container reader-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: theme === 'dark' ? '#121212' : (theme === 'sepia' ? '#f4ecd8' : '#f8f9fa'),
            zIndex: 1050,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <ReaderHeader
                theme={theme}
                title={manifest.titulo}
                onToggleToc={() => { setShowToc(!showToc); setShowBookmarks(false); }}
                onToggleSettings={() => setShowSettings(!showSettings)}
                onToggleBookmarks={() => { setShowBookmarks(!showBookmarks); setShowToc(false); }}
                onAddBookmark={() => {
                    if (isBookmarked(currentIndex)) {
                        removeBookmark(currentIndex);
                    } else {
                        addBookmark(currentIndex, `Página ${currentIndex + 1}`);
                    }
                }}
                isBookmarked={isBookmarked(currentIndex)}
                onClose={handleClose}
            />

            <ReaderSettingsPanel
                show={showSettings}
                theme={theme}
                fontSize={fontSize}
                lineHeight={lineHeight}
                marginMode={marginMode}
                onFontSizeDecrease={decreaseFontSize}
                onFontSizeIncrease={increaseFontSize}
                onLineHeightChange={setLineHeight}
                onMarginModeChange={setMarginMode}
                onThemeChange={setTheme}
            />

            <ReaderTocSidebar
                show={showToc}
                theme={theme}
                toc={manifest.toc}
                onClose={() => setShowToc(false)}
                onItemClick={handleTocClick}
            />

            <ReaderBookmarksSidebar
                show={showBookmarks}
                theme={theme}
                bookmarks={bookmarks}
                onClose={() => setShowBookmarks(false)}
                onItemClick={(index) => {
                    handleIndexChange(index);
                    setShowBookmarks(false);
                }}
                onRemoveBookmark={removeBookmark}
            />

            <ReaderHighlightMenu
                position={selectionMenu}
                onSelectColor={addHighlight}
                onClose={() => setSelectionMenu({ ...selectionMenu, show: false })}
            />

            <ReaderContent
                iframeRef={iframeRef}
                iframeSrc={iframeSrc}
                theme={theme}
                status={status}
                hasNext={hasNext}
                hasPrevious={hasPrevious}
                isNavigatingBack={isNavigatingBack}
                onLoad={applyStyles}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
            />

            <ReaderFooter
                theme={theme}
                currentIndex={currentIndex}
                totalPages={totalPages}
                onIndexChange={handleIndexChange}
            />
        </div>
    );
}