export default function DenunciasPage() {
  return (
    <div className="min-vh-100 py-5" style={{ background: 'linear-gradient(135deg, #fff0f0 0%, #fff 100%)' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="mb-5">
          <h1 className="display-5 fw-bold mb-2" style={{ color: '#8a2b2b' }}>Denuncias</h1>
          <p className="text-muted">Gestiona y revisa las denuncias realizadas</p>
        </div>

        <div className="card shadow-sm p-4">

          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <input type="text" className="form-control" placeholder="Buscar por usuario o denunciante..." />
            </div>
            <div className="col-md-3">
              <select className="form-select">
                <option value="">Filtrar por tipo</option>
                <option value="usuario">Usuario</option>
                <option value="libro">Libro</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Denunciante</th>
                  <th>Motivo</th>
                  <th>A quién</th>
                  <th>Fecha</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Laura Ruiz</td>
                  <td>Contenido inapropiado</td>
                  <td>Libro</td>
                  <td>2024-11-12</td>
                  <td className="text-end"><button className="btn btn-sm btn-outline-dark">Ver</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}