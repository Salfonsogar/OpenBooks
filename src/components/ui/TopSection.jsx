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
            {/* Replace horizontal scroll with responsive grid */}
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
                {books.map((libro, i) => (
                    <BookCard
                        key={i}
                        libro={libro}
                        showAdd={!isInLibrary(libro)}
                        showRemove={isInLibrary(libro)}
                        showDownload={false}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        onRead={onRead}
                    />
                ))}
            </div>
        </div>
    );
}
