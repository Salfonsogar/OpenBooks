import '../../assets/styles/PenaltiesTab.css';

export default function PenaltiesTab({ penalties }) {
  const activePenaltiesCount = penalties.filter(p => p.estado === 'Activa').length;

  return (
    <div>
      <h6 className="mb-3">
        <i className="bi bi-exclamation-triangle me-2"></i>
        Historial de Penalizaciones
      </h6>

      {penalties.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-check-circle text-success" style={{ fontSize: '3rem' }}></i>
          <h5 className="mt-3">No tienes penalizaciones</h5>
          <p className="text-muted">¡Sigue así!</p>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Motivo</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th className="text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {penalties.map((penalty) => (
                  <tr key={penalty.id}>
                    <td>
                      <i className="bi bi-exclamation-circle text-danger me-2"></i>
                      {penalty.motivo}
                    </td>
                    <td>
                      <small className="text-muted">
                        {new Date(penalty.fecha).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </small>
                    </td>
                    <td>
                      <span
                        className={`badge ${penalty.estado === "Activa"
                            ? "bg-danger"
                            : "bg-secondary"
                          }`}
                      >
                        {penalty.estado}
                      </span>
                    </td>
                    <td className="text-center">
                      {penalty.estado === "Activa" ? (
                        <button className="btn btn-outline-dark btn-sm">
                          <i className="bi bi-envelope me-1"></i>
                          Apelar
                        </button>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {activePenaltiesCount > 0 && (
            <div className="mt-4 p-3 bg-light rounded">
              <h6 className="mb-3">
                <i className="bi bi-chat-left-text me-2"></i>
                Enviar Apelación
              </h6>
              <form>
                <div className="mb-3">
                  <label htmlFor="penaltyReason" className="form-label">
                    Explica por qué consideras injusta la penalización
                  </label>
                  <textarea
                    className="form-control"
                    id="penaltyReason"
                    rows="4"
                    placeholder="Proporciona detalles sobre tu situación..."
                  ></textarea>
                </div>
                <button type="submit" className="btn-buscar">
                  <i className="bi bi-send me-2"></i>
                  Enviar Apelación
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}
