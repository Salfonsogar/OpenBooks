import { Link } from 'react-router-dom';
import Features from '../components/ui/Features';

export default function AdminPage() {
  const adminItems = [
    {
      title: '📚 Gestionar Libros',
      text: 'Administra todos los libros del sistema: editar, eliminar o revisar detalles.',
      to: '/libros',
      buttonText: 'Gestionar',
    },
    {
      title: '👤 Administrar Usuarios',
      text: 'Controla los usuarios registrados: permisos, bloqueos y actividad.',
      to: '/usuarios',
      buttonText: 'Usuarios',
    },
    {
      title: '📊 Reportes de Actividad',
      text: 'Visualiza métricas clave del sistema, actividad reciente y estadísticas.',
      to: '/reportes',
      buttonText: 'Ver reportes',
    },
  ];

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: 'linear-gradient(135deg, #f3e9e0 0%, #fff 100%)' }}
    >
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Título */}
        <div className="mb-5 text-center">
          <h1 className="display-5 fw-bold mb-3" style={{ color: '#6e3b3b' }}>
            Panel de Administración
          </h1>
          <p className="lead text-secondary">
            Controla y gestiona todos los recursos del sistema.
          </p>

          <Link
            to="/"
            className="btn btn-lg btn-main text-decoration-none mt-3"
          >
            Volver al Inicio
          </Link>
        </div>

        {/* Sección de features */}
        <div className="container mt-5">
          <Features items={adminItems} />
        </div>
      </div>

      {/* Aquí puedes agregar tu modal cuando lo necesites */}
    </div>
  );
}
