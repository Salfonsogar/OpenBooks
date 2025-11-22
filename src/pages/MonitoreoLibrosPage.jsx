import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCatalogBooks,
  selectCatalogBooks,
  selectCatalogStatus,
  deleteBook
} from "../store/booksSlice";

export default function MonitoreoLibrosPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const books = useSelector(selectCatalogBooks);
  const status = useSelector(selectCatalogStatus);
  const loading = status === 'loading';

  useEffect(() => {
    dispatch(fetchCatalogBooks({ page: 1, pageSize: 100 }));
  }, [dispatch]);

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
          <button className="btn btn-main btn-lg" onClick={() => navigate('/Upload')}>
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
    </div>
  );
}