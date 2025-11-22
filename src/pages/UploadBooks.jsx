import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UploadBooksPage() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [portada, setPortada] = useState(null);
  const [archivo, setArchivo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!portada || !archivo) {
      alert('Por favor, seleccione la portada y el archivo del libro');
      return;
    }

    const formData = new FormData();
    formData.append('Titulo', titulo);
    formData.append('Autor', autor);
    formData.append('Descripcion', descripcion);
    formData.append('Portada', portada);
    formData.append('Archivo', archivo);

    try {
      const response = await fetch('https://localhost:7080/api/libros/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Libro subido correctamente');
        // Opcional: limpiar formulario o redirigir al listado
        setTitulo('');
        setAutor('');
        setDescripcion('');
        setPortada(null);
        setArchivo(null);
        document.getElementById('portada').value = null;
        document.getElementById('archivo').value = null;
      } else {
        const errorData = await response.json();
        alert('Error al subir libro: ' + (errorData.error || 'Desconocido'));
      }
    } catch (error) {
      alert('Error en la conexión con el servidor: ' + error.message);
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

        {/* <div
          className="alert alert-info d-flex align-items-center mb-4"
          role="alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="me-2"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
          <div>
            Asegúrate de tener los derechos necesarios para subir este contenido
            a la biblioteca.
          </div>
        </div> */}

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
                <button type="submit" className="btn btn-main flex-fill">
                  Subir Libro
                </button>
                <button
                  type="button"
                  className="btn btn-secondary flex-fill"
                  onClick={() => navigate('/libros')}
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
