import React from 'react';
import BookCard from '../ui/BookCard';

export default function CatalogGrid({
    loading,
    books,
    activeFiltersCount,
    clearFilters,
    libraryBooks = [],
    isAuthenticated,
    onAdd,
    onRemove,
    onRead
}) {
    if (loading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center w-100"
                style={{ minHeight: 200 }}
            >
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (books.length === 0) {
        return (
            <div className="text-center w-100 py-5">
                <i className="bi bi-search text-muted" style={{ fontSize: '4rem' }}></i>
                <h4 className="mt-3 text-muted">No se encontraron libros</h4>
                <p className="text-muted">
                    Intenta ajustar los filtros o realizar otra búsqueda
                </p>
                {activeFiltersCount > 0 && (
                    <button
                        className="btn btn-outline-primary mt-2"
                        onClick={clearFilters}
                    >
                        <i className="bi bi-arrow-counterclockwise me-2"></i>
                        Limpiar filtros
                    </button>
                )}
            </div>
        );
    }

    const isInLibrary = (libro) => {
        return libraryBooks.some(lb => lb.id === libro.id);
    };

    return (
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
            {books.map((libro, i) => (
                <BookCard
                    key={i}
                    libro={{
                        ...libro,
                        Portada: libro.PortadaBase64
                            ? `data:image/png;base64,${libro.PortadaBase64}`
                            : "/placeholder.png",
                    }}
                    showAdd={!isInLibrary(libro)}
                    showRemove={isInLibrary(libro)}
                    showDownload={false}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onRead={onRead}
                />
            ))}
        </div>
    );
}
