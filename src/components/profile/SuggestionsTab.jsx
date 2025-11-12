export default function SuggestionsTab() {
  return (
    <div className="card-body">
      <h6 className="mb-3">
        <i className="bi bi-lightbulb-fill me-2"></i>
        Sugerencias de mejoras
      </h6>
      <p className="text-muted">
        ¿Tienes alguna idea para mejorar nuestra plataforma? ¡Nos encantaría escucharla!
      </p>
      <form>
        <div className="mb-3">
          <label htmlFor="suggestion" className="form-label">
            Tu Sugerencia
          </label>
          <textarea
            className="form-control"
            id="suggestion"
            rows="4"
            placeholder="Comparte tus ideas para mejorar..."
          ></textarea>
        </div>
        <button type="submit" className="btn-buscar">
          <i className="bi bi-send me-2"></i>
          Enviar Sugerencia
        </button>
      </form>
    </div>
  );
}
