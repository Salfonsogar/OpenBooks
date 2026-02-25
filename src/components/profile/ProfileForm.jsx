import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser, selectAuthToken } from '../../store/authSlice';
import { updateUserAsync, selectUserUpdateStatus, selectUserUpdateError } from '../../store/usersSlice';
import { updateUserProfile } from '../../store/authSlice';
import { User, Mail, Upload, X } from 'lucide-react';
import '../../assets/styles/ProfileForm.css';

export default function ProfileForm({ userData }) {
  const dispatch = useDispatch();
  const updateStatus = useSelector(selectUserUpdateStatus);
  const updateError = useSelector(selectUserUpdateError);
  const token = useSelector(selectAuthToken);

  const [formData, setFormData] = useState({
    userName: userData?.userName || "",
    nombreCompleto: userData?.nombreCompleto || "",
    email: userData?.email || "",
    contraseña: "",
    estado: userData?.estado !== undefined ? userData.estado : true,
    sancionado: userData?.sancionado || false,
    rolId: userData?.rolId || 0,
    fotoPerfilBase64: ""
  });

  const [previewImage, setPreviewImage] = useState(userData?.fotoPerfil ? `data:image/jpeg;base64,${userData.fotoPerfil}` : "");
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setMessage({ type: "danger", text: "La imagen no debe superar 2MB" });
        return;
      }

      if (!file.type.startsWith('image/')) {
        setMessage({ type: "danger", text: "Solo se permiten archivos de imagen" });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setFormData(prev => ({ ...prev, fotoPerfilBase64: base64String }));
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, fotoPerfilBase64: "" }));
    setPreviewImage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const dataToSend = { ...formData };
    if (!dataToSend.contraseña) {
      delete dataToSend.contraseña;
    }

    try {
      const result = await dispatch(updateUserAsync({ id: userData.id, userData: dataToSend }));

      if (updateUserAsync.fulfilled.match(result)) {
        // Obtener el usuario actualizado del backend
        const userResponse = await fetch(`https://localhost:7080/api/Usuarios/${userData.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (userResponse.ok) {
          const updatedUser = await userResponse.json();
          dispatch(updateUserProfile(updatedUser));
        }

        setMessage({
          type: "success",
          text: "Perfil actualizado correctamente"
        });
        setFormData(prev => ({ ...prev, contraseña: "" }));
      }
    } catch (error) {
      setMessage({
        type: "danger",
        text: "Error al actualizar el perfil"
      });
    }
  };

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
            onClick={() => setMessage({ type: "", text: "" })}
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

      <form onSubmit={handleSubmit} className="profile-form__body">
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
                onClick={handleRemoveImage}
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
              onChange={handleImageChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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