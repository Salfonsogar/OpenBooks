import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateBook, fetchBookDetail, selectCurrentBook, selectBookStatus } from '../store/booksSlice';
import { fetchCategories, selectAllCategories } from '../store/categoriesSlice';
import { ChevronDown } from 'lucide-react';

export default function EditBookPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const categories = useSelector(selectAllCategories);
    const book = useSelector(selectCurrentBook);
    const bookStatus = useSelector(selectBookStatus);

    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [portada, setPortada] = useState(null);
    const [archivo, setArchivo] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        dispatch(fetchCategories({ pageNumber: 1, pageSize: 100 }));
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            dispatch(fetchBookDetail(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (book && bookStatus === 'succeeded') {
            setTitulo(book.titulo || '');
            setAutor(book.autor || '');
            setDescripcion(book.descripcion || '');

            if (book.categorias && Array.isArray(book.categorias)) {
                const categoryIds = book.categorias.map(cat => cat.id || cat);
                setSelectedCategories(categoryIds);
            }
        }
    }, [book, bookStatus]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const toggleCategory = (catId) => {
        setSelectedCategories(prev => {
            if (prev.includes(catId)) {
                return prev.filter(id => id !== catId);
            } else {
                return [...prev, catId];
            }
        });
    };

    const removeCategory = (catId, e) => {
        e.stopPropagation();
        setSelectedCategories(prev => prev.filter(id => id !== catId));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        if (titulo.trim()) formData.append('Titulo', titulo);
        if (autor.trim()) formData.append('Autor', autor);
        if (descripcion.trim()) formData.append('Descripcion', descripcion);
        if (portada) formData.append('Portada', portada);
        if (archivo) formData.append('Archivo', archivo);

        if (selectedCategories.length > 0) {
            formData.append('CategoriasIds', JSON.stringify(selectedCategories));
        }

        setIsSubmitting(true);

        try {
            const resultAction = await dispatch(updateBook({ id, formData }));

            if (updateBook.fulfilled.match(resultAction)) {
                alert('Libro actualizado correctamente');
                navigate('/libros');
            } else {
                if (resultAction.payload) {
                    alert('Error al actualizar libro: ' + resultAction.payload);
                } else {
                    alert('Error al actualizar libro: ' + resultAction.error.message);
                }
            }
        } catch (error) {
            alert('Error inesperado: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (bookStatus === 'loading') {
        return (
            <div className="min-vh-100 bg-light py-4 d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 bg-light py-4">
            <div className="container" style={{ maxWidth: '900px' }}>
                <div className="mb-4">
                    <h1 className="display-5 fw-bold mb-2">Editar Libro</h1>
                    <p className="text-muted">
                        Actualiza solo los campos que desees cambiar
                    </p>
                </div>

                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-white">
                        <h5 className="card-title mb-0">Información del Libro</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="titulo" className="form-label">
                                        Título
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="titulo"
                                        placeholder="Ej: Cien Años de Soledad"
                                        value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="autor" className="form-label">
                                        Autor
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="autor"
                                        placeholder="Ej: Gabriel García Márquez"
                                        value={autor}
                                        onChange={(e) => setAutor(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="descripcion" className="form-label">
                                    Descripción
                                </label>
                                <textarea
                                    className="form-control"
                                    id="descripcion"
                                    rows="4"
                                    placeholder="Escribe una breve descripción del libro..."
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Categorías</label>
                                <div className="position-relative" ref={dropdownRef}>
                                    <button
                                        type="button"
                                        className="form-select text-start d-flex justify-content-between align-items-center"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <span className={selectedCategories.length === 0 ? "text-muted" : ""}>
                                            {selectedCategories.length === 0
                                                ? "Seleccionar categorías..."
                                                : `${selectedCategories.length} seleccionada(s)`}
                                        </span>
                                        <ChevronDown size={16} />
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="position-absolute w-100 mt-1 bg-white border rounded shadow-sm p-2" style={{ zIndex: 1000, maxHeight: '250px', overflowY: 'auto' }}>
                                            {categories.map(cat => (
                                                <div
                                                    key={cat.id}
                                                    className="form-check py-1 px-2 hover-bg-light rounded cursor-pointer"
                                                    onClick={() => toggleCategory(cat.id)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={selectedCategories.includes(cat.id)}
                                                        onChange={() => { }}
                                                        id={`cat-${cat.id}`}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                    <label className="form-check-label ms-2 w-100" htmlFor={`cat-${cat.id}`} style={{ cursor: 'pointer' }}>
                                                        {cat.nombre}
                                                    </label>
                                                </div>
                                            ))}
                                            {categories.length === 0 && (
                                                <div className="text-center text-muted py-2 small">No hay categorías disponibles</div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="d-flex flex-wrap gap-2 mt-2">
                                    {selectedCategories.map(catId => {
                                        const cat = categories.find(c => c.id === catId);
                                        if (!cat) return null;
                                        return (
                                            <span key={catId} className="badge bg-light text-dark border d-flex align-items-center px-2 py-1">
                                                {cat.nombre}
                                                <button
                                                    type="button"
                                                    className="btn-close ms-2"
                                                    style={{ fontSize: '0.5rem' }}
                                                    onClick={(e) => removeCategory(catId, e)}
                                                    aria-label="Remove"
                                                ></button>
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <label className="form-label">Cambiar Portada (opcional)</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="portada"
                                        accept="image/*"
                                        onChange={(e) => setPortada(e.target.files[0])}
                                    />
                                    <small className="text-muted">Deja vacío si no deseas cambiar la portada</small>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Cambiar Archivo (opcional)</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="archivo"
                                        accept=".pdf,.epub,.mobi"
                                        onChange={(e) => setArchivo(e.target.files[0])}
                                    />
                                    <small className="text-muted">Deja vacío si no deseas cambiar el archivo</small>
                                </div>
                            </div>

                            <div className="alert alert-info">
                                <i className="fas fa-info-circle me-2"></i>
                                <strong>Nota:</strong> Solo se actualizarán los campos que modifiques. Los campos vacíos mantendrán sus valores actuales.
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    type="submit"
                                    className="btn btn-main flex-fill"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Actualizando...' : 'Actualizar Libro'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary flex-fill"
                                    onClick={() => navigate('/libros')}
                                    disabled={isSubmitting}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
