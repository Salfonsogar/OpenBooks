import { useState, useEffect } from 'react';

export function useReaderBookmarks(bookId) {
    const [bookmarks, setBookmarks] = useState([]);

    // Load bookmarks from localStorage
    useEffect(() => {
        if (!bookId) return;

        try {
            const saved = localStorage.getItem(`bookmarks-${bookId}`);
            if (saved) {
                setBookmarks(JSON.parse(saved));
            } else {
                setBookmarks([]);
            }
        } catch (e) {
            console.error("Error loading bookmarks:", e);
        }
    }, [bookId]);

    // Save bookmarks to localStorage
    useEffect(() => {
        if (!bookId) return;
        localStorage.setItem(`bookmarks-${bookId}`, JSON.stringify(bookmarks));
    }, [bookmarks, bookId]);

    const addBookmark = (index, title) => {
        if (isBookmarked(index)) return;

        const newBookmark = {
            index,
            title: title || `Página ${index + 1}`,
            timestamp: Date.now()
        };

        setBookmarks(prev => [...prev, newBookmark].sort((a, b) => a.index - b.index));
    };

    const removeBookmark = (index) => {
        setBookmarks(prev => prev.filter(b => b.index !== index));
    };

    const isBookmarked = (index) => {
        return bookmarks.some(b => b.index === index);
    };

    return {
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked
    };
}
