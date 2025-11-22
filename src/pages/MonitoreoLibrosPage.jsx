import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCatalogBooks,
  selectCatalogBooks,
  selectCatalogStatus,
  addBook,
  updateBook,
  deleteBook
} from "../store/booksSlice";

export default function MonitoreoLibrosPage() {
  const dispatch = useDispatch();
  const books = useSelector(selectCatalogBooks);
  const status = useSelector(selectCatalogStatus);
  const loading = status === 'loading';

  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
    portada: "",
    valoracion: 0,
    archivo: ""
  });

  useEffect(() => {
    dispatch(fetchCatalogBooks({ page: 1, pageSize: 100 }));
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openModal = (book = null) => {
    if (book) {
      setEditingBook(book);
      setFormData({
        titulo: book.titulo || "",
        autor: book.autor || "",
        descripcion: book.descripcion || "",
        portada: book.portada || "",
        valoracion: book.valoracion || 0,
        archivo: book.archivo || ""
      });
    } else {
      setEditingBook(null);
      setFormData({
        titulo: "",
        autor: "",
        descripcion: "",
        portada: "",
        valoracion: 0,
        archivo: ""
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await dispatch(updateBook({ id: editingBook.id, bookData: formData })).unwrap();
      } else {
        await dispatch(addBook(formData)).unwrap();
      }
      setShowModal(false);
      dispatch(fetchCatalogBooks({ page: 1, pageSize: 100 }));
    } catch (error) {
      alert("Error al guardar el libro: " + error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este libro?")) {
      try {
        await dispatch(deleteBook(id)).unwrap();
        dispatch(fetchCatalogBooks({ page: 1, pageSize: 100 }));
      } catch (error) {
        alert("Error al eliminar el libro: " + error);
      }
    }
  };

  return (
    <div className="min-vh-100 py-5" style={{ background: 'linear-gradient(135deg, #f3e9e0 0%, #fff 100%)' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="display-5 fw-bold mb-2" style={{ color: '#6e3b3b' }}>Gestión de Libros</h1>
            <p className="text-muted">Administra el catálogo de libros de la biblioteca</p>
          </div>
          <button className="btn btn-main btn-lg" onClick={() => openModal()}>
            <i className="fas fa-plus me-2"></i>
            Nuevo Libro
          </button>
        </div>

        <div className="card shadow-sm p-4">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Valoración</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                      </div>
                    </td>
                  </tr>
                ) : books.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-muted">
                      No hay libros registrados
                    </td>
                  </tr>
                ) : (
                  books.map((book) => (
                    <tr key={book.id}>
                      <td className="fw-bold">{book.titulo}</td>
                      <td>{book.autor}</td>
                      <td>
                        <span className="badge bg-warning text-dark">
                          <i className="fas fa-star me-1"></i>
                          {book.valoracion || 0}
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => openModal(book)}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(book.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingBook ? 'Editar Libro' : 'Nuevo Libro'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Título</label>
                      <input
                        type="text"
                        className="form-control"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Autor</label>
                      <input
                        type="text"
                        className="form-control"
                        name="autor"
                        value={formData.autor}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Descripción</label>
                      <textarea
                        className="form-control"
                        name="descripcion"
                        rows="3"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">URL de Portada</label>
                      <input
                        type="url"
                        className="form-control"
                        name="portada"
                        value={formData.portada}
                        onChange={handleInputChange}
                        placeholder="https://ejemplo.com/portada.jpg"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Valoración (0-5)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="valoracion"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.valoracion}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">URL del Archivo</label>
                      <input
                        type="url"
                        className="form-control"
                        name="archivo"
                        value={formData.archivo}
                        onChange={handleInputChange}
                        placeholder="https://ejemplo.com/libro.pdf"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}