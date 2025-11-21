import { AlertTriangle, Search, Filter, Eye } from 'lucide-react';
import { useState } from 'react';

export default function PenalizacionesPage() {
  const [showModal, setShowModal] = useState(false);
  const [filterUser, setFilterUser] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const penalizaciones = [
    {
      id: 1,
      usuario: 'Carlos López',
      motivo: 'Préstamo vencido',
      fecha: '2024-11-15',
      estado: 'activo',
      descripcion: 'Libro no devuelto después de 30 días',
    },
    {
      id: 2,
      usuario: 'Ana Martínez',
      motivo: 'Daño al material',
      fecha: '2024-11-10',
      estado: 'apelado',
      descripcion: 'Páginas arrancadas del libro',
    },
    {
      id: 3,
      usuario: 'Pedro Sánchez',
      motivo: 'Comportamiento inadecuado',
      fecha: '2024-11-05',
      estado: 'desactivado',
      descripcion: 'Múltiples reportes de ruido excesivo',
    },
  ];

  const getStatusBadge = (estado) => {
    const styles = {
      activo: { bg: '#f8d7da', color: '#721c24', border: '#f5c6cb' },
      desactivado: { bg: '#d4edda', color: '#155724', border: '#c3e6cb' },
      apelado: { bg: '#fff3cd', color: '#856404', border: '#ffeeba' },
    };

    return (
      <span
        className="badge"
        style={{
          backgroundColor: styles[estado].bg,
          color: styles[estado].color,
          border: `1px solid ${styles[estado].border}`,
        }}
      >
        {estado.charAt(0).toUpperCase() + estado.slice(1)}
      </span>
    );
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: 'linear-gradient(135deg, #f3e9e0 0%, #fff 100%)' }}
    >
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="mb-5">
          <h1 className="display-5 fw-bold mb-2" style={{ color: '#6e3b3b' }}>
            Penalizaciones
          </h1>
          <p className="text-muted">
            Gestiona las penalizaciones aplicadas a los usuarios
          </p>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            {/* Filtros */}
            <div className="row mb-4">
              <div className="col-md-6 mb-3 mb-md-0">
                <div className="position-relative">
                  <Search
                    size={18}
                    className="position-absolute text-muted"
                    style={{ left: '12px', top: '10px', pointerEvents: 'none' }}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por usuario..."
                    style={{ paddingLeft: '40px' }}
                    value={filterUser}
                    onChange={(e) => setFilterUser(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">Todos los estados</option>
                  <option value="activo">Activo</option>
                  <option value="desactivado">Desactivado</option>
                  <option value="apelado">Apelado</option>
                </select>
              </div>
            </div>

            {/* Tabla */}
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr style={{ borderBottom: '2px solid #e9ecef' }}>
                    <th style={{ color: '#6e3b3b', fontWeight: '600' }}>
                      Usuario
                    </th>
                    <th style={{ color: '#6e3b3b', fontWeight: '600' }}>
                      Motivo
                    </th>
                    <th style={{ color: '#6e3b3b', fontWeight: '600' }}>
                      Fecha
                    </th>
                    <th style={{ color: '#6e3b3b', fontWeight: '600' }}>
                      Estado
                    </th>
                    <th
                      className="text-end"
                      style={{ color: '#6e3b3b', fontWeight: '600' }}
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {penalizaciones.map((pen) => (
                    <tr key={pen.id}>
                      <td className="fw-medium">{pen.usuario}</td>
                      <td>{pen.motivo}</td>
                      <td>{pen.fecha}</td>
                      <td>{getStatusBadge(pen.estado)}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-ghost"
                          title="Ver detalles"
                          onClick={() => setShowModal(true)}
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Detalles */}
      {showModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-bottom">
                <h5 className="modal-title">Detalles de Penalización</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-bold">Usuario</label>
                  <p className="mb-0">Carlos López</p>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Motivo</label>
                  <p className="mb-0">Préstamo vencido</p>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Descripción</label>
                  <p className="mb-0">
                    Libro no devuelto después de 30 días
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Fecha</label>
                  <p className="mb-0">2024-11-15</p>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Estado</label>
                  <div>{getStatusBadge('activo')}</div>
                </div>
              </div>
              <div className="modal-footer border-top">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}