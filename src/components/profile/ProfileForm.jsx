import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser, selectAuthToken } from '../../store/authSlice';
import { updateUserAsync, selectUserUpdateStatus, selectUserUpdateError } from '../../store/usersSlice';
import { updateUserProfile } from '../../store/authSlice';
import { User, Mail, Upload, X } from 'lucide-react';

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
    <div className="container my-0 d-flex justify-content-center align-items-start">
      <div className="col-lg-8 p-4">
        <div className="mb-4 text-center">
          <h4 className="fw-bold mb-2">
            <User className="me-2" size={24} />
            Información Personal
          </h4>
          <p className="text-muted mb-0">
            Actualiza tus datos y personaliza tu perfil
          </p>
        </div>

        {message.text && (
          <div
            className={`alert alert-${message.type} alert-dismissible fade show`}
            role="alert"
          >
            {message.text}
            <button
              type="button"
              className="btn-close"
              onClick={() => setMessage({ type: "", text: "" })}
            ></button>
          </div>
        )}

        {updateStatus === 'failed' && updateError && (
          <div className="alert alert-danger">
            <ul className="mb-0 ps-3">
              {Array.isArray(updateError) ? updateError.map((err, idx) => (
                <li key={idx}>{err}</li>
              )) : <li>{updateError}</li>}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-center">
            <label className="form-label fw-bold d-block">Foto de Perfil</label>
            {previewImage ? (
              <div className="position-relative d-inline-block">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="rounded-circle"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <button
                  type="button"
                  className="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle"
                  onClick={handleRemoveImage}
                  style={{ width: '30px', height: '30px', padding: 0 }}
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div
                className="rounded-circle bg-secondary d-inline-flex align-items-center justify-content-center"
                style={{ width: '150px', height: '150px' }}
              >
                <User size={60} className="text-white" />
              </div>
            )}
            <div className="mt-3">
              <label htmlFor="imageUpload" className="btn btn-outline-primary btn-sm">
                <Upload size={16} className="me-2" />
                Subir Imagen
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="d-none"
              />
              <small className="d-block text-muted mt-2">Máximo 2MB - JPG, PNG, GIF</small>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="userName" className="form-label fw-bold">
              Nombre de Usuario
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              placeholder="Tu nombre de usuario"
              disabled={updateStatus === 'loading'}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nombreCompleto" className="form-label fw-bold">
              Nombre Completo
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="nombreCompleto"
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleInputChange}
              placeholder="Tu nombre completo"
              disabled={updateStatus === 'loading'}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="form-label fw-bold">
              <Mail className="me-2" size={18} />
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="usuario@ejemplo.com"
              disabled={updateStatus === 'loading'}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contraseña" className="form-label fw-bold">
              Nueva Contraseña
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="contraseña"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleInputChange}
              placeholder="Dejar en blanco para no cambiar"
              disabled={updateStatus === 'loading'}
            />
            <small className="text-muted">
              Solo completa este campo si deseas cambiar tu contraseña
            </small>
          </div>

          <div className="d-flex justify-content-end gap-2 pt-3">
            <button type="submit" className="btn btn-primary btn-lg" disabled={updateStatus === 'loading'}>
              {updateStatus === 'loading' ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Guardando...
                </>
              ) : (
                <>
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}