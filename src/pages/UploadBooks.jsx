export default function UploadBooksPage() {
  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="mb-4">
          <h1 className="display-5 fw-bold mb-2">Subir Libro</h1>
          <p className="text-muted">
            Agrega un nuevo libro a la biblioteca digital
          </p>
        </div>

        <div
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
        </div>

        <div className="card shadow-sm mb-4">
          <div className="card-header bg-white">
            <h5 className="card-title mb-0">Información del Libro</h5>
          </div>
          <div className="card-body">
            <form>
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
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label htmlFor="isbn" className="form-label">
                    ISBN
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="isbn"
                    placeholder="Ej: 978-3-16-148410-0"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="editorial" className="form-label">
                    Editorial
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editorial"
                    placeholder="Ej: Editorial Sudamericana"
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-4">
                  <label htmlFor="año" className="form-label">
                    Año de Publicación
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="año"
                    placeholder="Ej: 1967"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="paginas" className="form-label">
                    Páginas
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="paginas"
                    placeholder="Ej: 432"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="idioma" className="form-label">
                    Idioma *
                  </label>
                  <select className="form-select" id="idioma" required>
                    <option value="">Selecciona</option>
                    <option value="es">Español</option>
                    <option value="en">Inglés</option>
                    <option value="fr">Francés</option>
                    <option value="de">Alemán</option>
                    <option value="pt">Portugués</option>
                    <option value="it">Italiano</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="categoria" className="form-label">
                  Categoría *
                </label>
                <select className="form-select" id="categoria" required>
                  <option value="">Selecciona una categoría</option>
                  <option value="ficcion">Ficción</option>
                  <option value="no-ficcion">No Ficción</option>
                  <option value="ciencia">Ciencia</option>
                  <option value="historia">Historia</option>
                  <option value="biografia">Biografía</option>
                  <option value="poesia">Poesía</option>
                  <option value="filosofia">Filosofía</option>
                  <option value="tecnologia">Tecnología</option>
                  <option value="arte">Arte</option>
                  <option value="infantil">Infantil</option>
                </select>
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
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="etiquetas" className="form-label">
                  Etiquetas
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etiquetas"
                  placeholder="Ej: realismo mágico, literatura latinoamericana, clásico"
                />
                <small className="form-text text-muted">
                  Separa las etiquetas con comas
                </small>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label">Portada del Libro</label>
                  <div className="file-upload-zone">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      fill="currentColor"
                      className="text-muted mb-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                    </svg>
                    <p className="text-muted mb-2">
                      Arrastra una imagen o haz clic
                    </p>
                    <input
                      type="file"
                      className="d-none"
                      id="portada"
                      accept="image/*"
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => document.getElementById('portada').click()}
                    >
                      Seleccionar Imagen
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Archivo del Libro *</label>
                  <div className="file-upload-zone">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      fill="currentColor"
                      className="text-muted mb-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" />
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                    </svg>
                    <p className="text-muted mb-2">
                      Arrastra un archivo o haz clic
                    </p>
                    <input
                      type="file"
                      className="d-none"
                      id="archivo"
                      accept=".pdf,.epub,.mobi"
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => document.getElementById('archivo').click()}
                    >
                      Seleccionar Archivo
                    </button>
                    <small className="d-block text-muted mt-2">
                      PDF, EPUB o MOBI
                    </small>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary flex-fill">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="me-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                  </svg>
                  Subir Libro
                </button>
                <button type="button" className="btn btn-secondary flex-fill">
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
