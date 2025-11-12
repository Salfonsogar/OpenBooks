export default function ProfileMainView() {
  return (
    <div className="card-body d-flex flex-column justify-content-center align-items-center text-center min-vh-100">
      <div className="mb-4">
        <i
          className="bi bi-gear-wide-connected text-muted"
          style={{ fontSize: "5rem", opacity: 0.3 }}
        ></i>
      </div>
      <h4 className="text-muted mb-3">Configuración de Cuenta</h4>
      <p className="text-muted">
        Selecciona una opción del menú lateral para comenzar
      </p>
    </div>
  );
}
