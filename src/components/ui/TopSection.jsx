import React from 'react';
import BookCard from './BookCard';

export default function TopSection({ title, icon, books, onAdd, onRemove, onRead, estanteria }) {
    if (!books || books.length === 0) return null;

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
                            isInLibrary={estanteria.some(l => l.titulo === libro.titulo && l.autor === libro.autor)}
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
