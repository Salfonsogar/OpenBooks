import React from 'react';
import BookCard from './BookCard';

export default function TopSection({
    title,
    icon,
    books,
    libraryBooks = [],
    isAuthenticated,
    onAdd,
    onRemove,
    onRead
}) {
    if (!books || books.length === 0) return null;

    const isInLibrary = (libro) => {
        return libraryBooks.some(lb => lb.id === libro.id);
    };

    return (
        <div className="mb-5">
            <h3 className="mb-3 fw-bold" style={{ color: '#6e3b3b' }}>
                <i className={`bi ${icon} me-2`}></i>
                {title}
            </h3>
            <div
                className="d-flex overflow-auto pb-3 px-1"
                style={{
                    gap: '1.5rem',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#6e3b3b #f0f0f0'
                }}
            >
                {books.map((libro, i) => (
                    <div key={i} style={{ minWidth: '220px', maxWidth: '220px' }}>
                        <BookCard
                            libro={libro}
                            showAdd={!isInLibrary(libro)}
                            showRemove={isInLibrary(libro)}
                            showDownload={false}
                            onAdd={onAdd}
                            onRemove={onRemove}
                            onRead={onRead}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
