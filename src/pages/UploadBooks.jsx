import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadBookAsync } from '../store/booksSlice';
import { fetchCategories, selectAllCategories } from '../store/categoriesSlice';
import { X, ChevronDown, Check } from 'lucide-react';

export default function UploadBooksPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);

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

    if (!portada || !archivo) {
      alert('Por favor, seleccione la portada y el archivo del libro');
      return;
    }

    if (selectedCategories.length === 0) {
      alert('Por favor, seleccione al menos una categoría');
      return;
    }

    const formData = new FormData();
    formData.append('Titulo', titulo);
    formData.append('Autor', autor);
    formData.append('Descripcion', descripcion);
    formData.append('Portada', portada);
    formData.append('Archivo', archivo);
    formData.append('CategoriasIds', JSON.stringify(selectedCategories));

    setIsSubmitting(true);

    try {
      const resultAction = await dispatch(uploadBookAsync(formData));

      if (uploadBookAsync.fulfilled.match(resultAction)) {
        alert('Libro subido correctamente');
        setTitulo('');
        setAutor('');
        setDescripcion('');
        setPortada(null);
        setArchivo(null);
        setSelectedCategories([]);
        const portadaInput = document.getElementById('portada');
        const archivoInput = document.getElementById('archivo');
        if (portadaInput) portadaInput.value = '';
        if (archivoInput) archivoInput.value = '';
      } else {
        if (resultAction.payload) {
          alert('Error al subir libro: ' + resultAction.payload);
        } else {
          alert('Error al subir libro: ' + resultAction.error.message);
        }
      }
    } catch (error) {
      alert('Error inesperado: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="mb-4">
          <h1 className="display-5 fw-bold mb-2">Subir Libro</h1>
          <p className="text-muted">
            Agrega un nuevo libro a la biblioteca digital
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
                    Título *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    placeholder="Ej: Cien Años de Soledad"
                    required
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="autor" className="form-label">
                    Autor *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="autor"
                    placeholder="Ej: Gabriel García Márquez"
                    required
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">
                  Descripción *
                </label>
                <textarea
                  className="form-control"
                  id="descripcion"
                  rows="4"
                  placeholder="Escribe una breve descripción del libro..."
                  required
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Categorías *</label>
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
                  <label className="form-label">Portada del Libro</label>
                  <input
                    type="file"
                    className="form-control"
                    id="portada"
                    accept="image/*"
                    required
                    onChange={(e) => setPortada(e.target.files[0])}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Archivo del Libro *</label>
                  <input
                    type="file"
                    className="form-control"
                    id="archivo"
                    accept=".pdf,.epub,.mobi"
                    required
                    onChange={(e) => setArchivo(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-main flex-fill"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Subiendo...' : 'Subir Libro'}
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

        <div className="card shadow-sm">
          <div className="card-header bg-white">
            <h5 className="card-title mb-0">Formatos Soportados</h5>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <div className="d-flex align-items-start">
                  <div className="bg-primary bg-opacity-10 rounded p-2 me-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="text-primary"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" />
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                    </svg>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">PDF</h6>
                    <small className="text-muted">
                      Formato universal compatible con todos los dispositivos
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-start">
                  <div className="bg-primary bg-opacity-10 rounded p-2 me-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="text-primary"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" />
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                    </svg>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">EPUB</h6>
                    <small className="text-muted">
                      Ideal para e-readers y aplicaciones de lectura
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-start">
                  <div className="bg-primary bg-opacity-10 rounded p-2 me-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="text-primary"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" />
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                    </svg>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">MOBI</h6>
                    <small className="text-muted">
                      Compatible con dispositivos Kindle
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
