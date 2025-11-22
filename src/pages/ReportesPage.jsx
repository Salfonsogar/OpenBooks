export default function ReportesPage() {
  return (
    <div className="min-vh-100 py-5" style={{ background: 'linear-gradient(135deg, #f3e9e0 0%, #fff 100%)' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="mb-5">
          <h1 className="display-5 fw-bold mb-2" style={{ color: '#6e3b3b' }}>Reportes</h1>
          <p className="text-muted">Genera y descarga reportes del sistema</p>
        </div>

        <div className="card shadow-sm p-4">
          <h4 className="fw-bold mb-3">Libros con más descargas</h4>

          <div className="row mb-4">
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Filtrar por nombre o categoría..." />
            </div>
          </div>

          <button className="btn btn-main">Descargar PDF</button>
        </div>
      </div>
    </div>
  );
}
