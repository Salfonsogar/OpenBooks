import { useState, useEffect, useCallback } from 'react';

export function useReaderHighlights(bookId, iframeRef, currentIndex) {
    const [highlights, setHighlights] = useState([]);
    const [selectionMenu, setSelectionMenu] = useState({ show: false, x: 0, y: 0, text: '', range: null });

    // Load highlights
    useEffect(() => {
        if (!bookId) return;
        try {
            const saved = localStorage.getItem(`highlights-${bookId}`);
            if (saved) {
                setHighlights(JSON.parse(saved));
            }
        } catch (e) {
            console.error("Error loading highlights:", e);
        }
    }, [bookId]);

    // Save highlights
    useEffect(() => {
        if (!bookId) return;
        localStorage.setItem(`highlights-${bookId}`, JSON.stringify(highlights));
    }, [highlights, bookId]);

    // Handle selection in iframe
    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const handleMouseUp = () => {
            const doc = iframe.contentDocument;
            if (!doc) return;

            const selection = doc.getSelection();
            if (!selection || selection.isCollapsed) {
                setSelectionMenu({ show: false, x: 0, y: 0, text: '', range: null });
                return;
            }

            const text = selection.toString().trim();
            if (text.length === 0) return;

            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            // Calculate position relative to the viewport (iframe position + selection position)
            const iframeRect = iframe.getBoundingClientRect();

            setSelectionMenu({
                show: true,
                x: iframeRect.left + rect.left + (rect.width / 2),
                y: iframeRect.top + rect.top - 10, // 10px above selection
                text: text,
                range: range
            });
        };

        // We need to attach listener when iframe loads
        const attachListener = () => {
            const doc = iframe.contentDocument;
            if (doc) {
                doc.addEventListener('mouseup', handleMouseUp);
                // Also listen to touch end for mobile
                doc.addEventListener('touchend', handleMouseUp);
            }
        };

        iframe.addEventListener('load', attachListener);
        // Try attaching immediately in case it's already loaded
        attachListener();

        return () => {
            iframe.removeEventListener('load', attachListener);
            const doc = iframe.contentDocument;
            if (doc) {
                doc.removeEventListener('mouseup', handleMouseUp);
                doc.removeEventListener('touchend', handleMouseUp);
            }
        };
    }, [iframeRef, currentIndex]); // Re-attach on index change (new chapter loaded)

    const addHighlight = (color) => {
        if (!selectionMenu.range) return;

        const newHighlight = {
            id: Date.now(),
            chapterIndex: currentIndex,
            text: selectionMenu.text,
            color: color,
            timestamp: Date.now()
        };

        setHighlights(prev => [...prev, newHighlight]);

        // Visual highlighting in DOM (Temporary for this session)
        try {
            const span = document.createElement('span');
            span.style.backgroundColor = color;
            span.style.opacity = '0.7';
            span.style.borderRadius = '2px';
            span.style.padding = '0 2px';
            span.dataset.highlightId = newHighlight.id;
            selectionMenu.range.surroundContents(span);
        } catch (e) {
            console.warn("Could not wrap selection (likely crosses block boundaries):", e);
        }

        // Clear selection
        const doc = iframeRef.current?.contentDocument;
        if (doc) doc.getSelection().removeAllRanges();

        setSelectionMenu({ show: false, x: 0, y: 0, text: '', range: null });
    };

    const removeHighlight = (id) => {
        setHighlights(prev => prev.filter(h => h.id !== id));
        // Note: Removing visual highlight from DOM would require finding the span by ID
        // This is complex if the DOM has changed, so we rely on state for now.
    };

    return {
        highlights,
        selectionMenu,
        addHighlight,
        removeHighlight,
        setSelectionMenu // Exported to allow closing menu from outside
    };
}
