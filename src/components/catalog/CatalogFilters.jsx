import React from 'react';

export default function CatalogFilters({
    showFilters,
    activeFiltersCount,
    clearFilters,
    autor,
    handleAutorChange,
    setAutor,
    setPage,
    categorias,
    allCategorias,
    handleCategoriaToggle
}) {
    if (!showFilters) return null;

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body">
                <h5 className="card-title mb-4">
                    <i className="bi bi-sliders me-2"></i>
                    Refina tu búsqueda
                </h5>

                <div className="row g-4">
                    <div className="col-md-6">
                        <label className="form-label fw-bold">
                            <i className="bi bi-person me-2 text-primary"></i>
                            Filtrar por Autor
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-search"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ej: Gabriel García Márquez"
                                value={autor}
                                onChange={handleAutorChange}
                            />
                            {autor && (
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => {
                                        setAutor("");
                                        setPage(1);
                                    }}
                                >
                                    <i className="bi bi-x"></i>
                                </button>
                            )}
                        </div>
                        {autor && (
                            <small className="text-success mt-1 d-block">
                                <i className="bi bi-check-circle me-1"></i>
                                Filtrando por: <strong>{autor}</strong>
                            </small>
                        )}
                    </div>

                    <div className="col-md-6">
                        <label className="form-label fw-bold">
                            <i className="bi bi-tag me-2 text-success"></i>
                            Categorías
                            {categorias.length > 0 && (
                                <span className="badge bg-success ms-2">
                                    {categorias.length} seleccionada{categorias.length !== 1 ? 's' : ''}
                                </span>
                            )}
                        </label>

                        <div className="dropdown">
                            <button
                                className="btn btn-outline-secondary w-100 text-start d-flex justify-content-between align-items-center"
                                type="button"
                                data-bs-toggle="dropdown"
                            >
                                <span>
                                    {categorias.length === 0
                                        ? "Selecciona categorías..."
                                        : `${categorias.length} categoría${categorias.length !== 1 ? 's' : ''} seleccionada${categorias.length !== 1 ? 's' : ''}`
                                    }
                                </span>
                                <i className="bi bi-chevron-down"></i>
                            </button>

                            <div
                                className="dropdown-menu w-100 p-3"
                                style={{ maxHeight: '300px', overflowY: 'auto' }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {allCategorias.length === 0 ? (
                                    <div className="text-center w-100 py-5">
                                        <i className="bi bi-inbox fs-4 d-block mb-2"></i>
                                        <small>No hay categorías disponibles</small>
                                    </div>
                                ) : (
                                    allCategorias.map((cat) => {
                                        const categoryName = cat.nombre || cat.Nombre;
                                        const categoryId = cat.id || cat.Id || categoryName;
                                        const isSelected = categorias.includes(categoryName);

                                        return (
                                            <div
                                                key={categoryId}
                                                className="form-check mb-2"
                                            >
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`cat-${categoryId}`}
                                                    checked={isSelected}
                                                    onChange={() => handleCategoriaToggle(categoryName)}
                                                />
                                                <label
                                                    className="form-check-label w-100"
                                                    htmlFor={`cat-${categoryId}`}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {categoryName}
                                                </label>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                        {categorias.length > 0 && (
                            <div className="mt-2 d-flex flex-wrap gap-2">
                                {categorias.map((cat) => (
                                    <span
                                        key={cat}
                                        className="badge bg-success d-inline-flex align-items-center gap-1"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleCategoriaToggle(cat)}
                                    >
                                        {cat}
                                        <i className="bi bi-x"></i>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {activeFiltersCount > 0 && (
                    <div className="mt-3 pt-3 border-top">
                        <small className="text-muted">
                            <i className="bi bi-info-circle me-1"></i>
                            <strong>{activeFiltersCount}</strong> filtro{activeFiltersCount !== 1 ? 's' : ''} activo{activeFiltersCount !== 1 ? 's' : ''}
                        </small>
                    </div>
                )}
            </div>
        </div>
    );
}
