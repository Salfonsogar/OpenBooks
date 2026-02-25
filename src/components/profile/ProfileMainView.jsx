import '../../assets/styles/ProfileMainView.css';

export default function ProfileMainView() {
  return (
    <div className="profile-main">
      <div className="profile-main__empty">
        <div className="profile-main__icon">
          <i className="bi bi-gear-wide-connected"></i>
        </div>
        <h4 className="profile-main__title">Configuración de Cuenta</h4>
        <p className="profile-main__subtitle">
          Selecciona una opción del menú lateral para comenzar
        </p>
      </div>
    </div>
  );
}
