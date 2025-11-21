export default function MonitoreoLibrosPage() {
  return (
    <div className="min-vh-100 py-5" style={{ background: 'linear-gradient(135deg, #eef1ff 0%, #fff 100%)' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="mb-5">
          <h1 className="display-5 fw-bold mb-2" style={{ color: '#2c3e8a' }}>Monitoreo de Libros</h1>
          <p className="text-muted">Consulta actividad, descargas y movimientos de libros</p>
        </div>

        <div className="card shadow-sm p-4">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Libro</th>
                  <th>Descargas</th>
                  <th>Último movimiento</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Introducción a React</td>
                  <td>154</td>
                  <td>2024-11-14</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}