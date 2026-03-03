import { User, Mail, Upload, X } from 'lucide-react';
import '../styles/ProfileForm.module.css';

export default function ProfileFormUI({ 
  formData, 
  previewImage, 
  message, 
  updateStatus, 
  updateError,
  onInputChange, 
  onImageChange, 
  onRemoveImage, 
  onSubmit,
  onCloseMessage
}) {
  return (
    <div className="profile-form">
      <div className="profile-form__header">
        <div className="profile-form__icon">
          <User size={20} />
        </div>
        <div>
          <h4 className="profile-form__title">Información Personal</h4>
          <p className="profile-form__subtitle">Actualiza tus datos y personaliza tu perfil</p>
        </div>
      </div>

      {message.text && (
        <div className={`profile-alert profile-alert--${message.type}`}>
          <span>{message.text}</span>
          <button
            className="profile-alert__close"
            onClick={onCloseMessage}
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
      )}

      {updateStatus === 'failed' && updateError && (
        <div className="profile-alert profile-alert--danger">
          <ul className="profile-alert__list">
            {Array.isArray(updateError) ? updateError.map((err, idx) => (
              <li key={idx}>{err}</li>
            )) : <li>{updateError}</li>}
          </ul>
        </div>
      )}

      <form onSubmit={onSubmit} className="profile-form__body">
        <div className="profile-form__avatar-section">
          <label className="profile-form__avatar-label">Foto de Perfil</label>
          {previewImage ? (
            <div className="profile-form__avatar-wrapper">
              <img
                src={previewImage}
                alt="Preview"
                className="profile-form__avatar"
              />
              <button
                type="button"
                className="profile-form__avatar-remove"
                onClick={onRemoveImage}
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div className="profile-form__avatar profile-form__avatar--placeholder">
              <User size={48} />
            </div>
          )}
          <div className="profile-form__avatar-actions">
            <label htmlFor="imageUpload" className="profile-form__upload-btn">
              <Upload size={14} />
              Subir Imagen
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="d-none"
            />
            <span className="profile-form__upload-hint">Máximo 2MB - JPG, PNG, GIF</span>
          </div>
        </div>

        <div className="profile-form__field">
          <label htmlFor="userName" className="profile-form__label">
            Nombre de Usuario
          </label>
          <input
            type="text"
            className="profile-form__input"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={onInputChange}
            placeholder="Tu nombre de usuario"
            disabled={updateStatus === 'loading'}
            required
          />
        </div>

        <div className="profile-form__field">
          <label htmlFor="nombreCompleto" className="profile-form__label">
            Nombre Completo
          </label>
          <input
            type="text"
            className="profile-form__input"
            id="nombreCompleto"
            name="nombreCompleto"
            value={formData.nombreCompleto}
            onChange={onInputChange}
            placeholder="Tu nombre completo"
            disabled={updateStatus === 'loading'}
            required
          />
        </div>

        <div className="profile-form__field">
          <label htmlFor="email" className="profile-form__label">
            <Mail size={16} />
            Correo Electrónico
          </label>
          <input
            type="email"
            className="profile-form__input"
            id="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            placeholder="usuario@ejemplo.com"
            disabled={updateStatus === 'loading'}
            required
          />
        </div>

        <div className="profile-form__field">
          <label htmlFor="contraseña" className="profile-form__label">
            Nueva Contraseña
          </label>
          <input
            type="password"
            className="profile-form__input"
            id="contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={onInputChange}
            placeholder="Dejar en blanco para no cambiar"
            disabled={updateStatus === 'loading'}
          />
          <span className="profile-form__hint">Solo completa este campo si deseas cambiar tu contraseña</span>
        </div>

        <div className="profile-form__actions">
          <button type="submit" className="profile-form__submit" disabled={updateStatus === 'loading'}>
            {updateStatus === 'loading' ? (
              <>
                <span className="profile-form__spinner"></span>
                Guardando...
              </>
            ) : (
              <>
                <i className="bi bi-check-lg"></i>
                Guardar Cambios
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
