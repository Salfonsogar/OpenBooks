import '../../assets/styles/Activitytab.css';

export default function ActivityTab({ user }) {
  const historial = user?.Historial || [];
  const librosLeidos = historial.length;
  const enProgreso = historial.filter(h => h.Progreso < 1).length;
  // No hay horasTotales en el DTO ni en tabla historial
  const horasTotales = 243;

  return (
    <div className="card bg-light border-0">
      <div className="card-body">
        <h6 className="card-title mb-4">
          <i className="bi bi-bar-chart me-2"></i>
          Estadísticas de Lectura
        </h6>
        <div className="row text-center">
          <div className="col-4">
            <i className="bi bi-book-fill text-primary display-4 mb-2"></i>
            <h3 className="fw-bold text-dark">{librosLeidos}</h3>
            <small className="text-muted">Libros Leídos</small>
          </div>
          <div className="col-4">
            <i className="bi bi-bookmark-fill text-warning display-4 mb-2"></i>
            <h3 className="fw-bold text-dark">{enProgreso}</h3>
            <small className="text-muted">En Progreso</small>
          </div>
          <div className="col-4">
            <i className="bi bi-clock-fill text-success display-4 mb-2"></i>
            <h3 className="fw-bold text-dark">{horasTotales}</h3>
            <small className="text-muted">Horas Totales</small>
          </div>
        </div>
      </div>
    </div>
  );
}
