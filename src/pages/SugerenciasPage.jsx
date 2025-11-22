export default function SugerenciasPage() {
  return (
    <div className="min-vh-100 py-5" style={{ background: 'linear-gradient(135deg, #f3e9e0 0%, #fff 100%)' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="mb-5">
          <h1 className="display-5 fw-bold mb-2" style={{ color: '#6e3b3b' }}>Sugerencias</h1>
          <p className="text-muted">Revisa las sugerencias enviadas por los usuarios</p>
        </div>

        <div className="card shadow-sm p-4">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Usuario</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Agregar más libros de programación</td>
                  <td>Daniel Gómez</td>
                  <td>2024-11-10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}