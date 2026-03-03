import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser, selectAuthToken } from '../../auth/store/authSlice';
import { updateUserAsync } from '../../admin/store/usersSlice';
import { updateUserProfile } from '../../auth/store/authSlice';
import ProfileFormUI from '../components/ProfileForm';

export default function ProfileFormContainer({ userData }) {
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);
  const updateStatus = useSelector(state => state.users.updateStatus);
  const updateError = useSelector(state => state.users.updateError);

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
    <ProfileFormUI
      formData={formData}
      previewImage={previewImage}
      message={message}
      updateStatus={updateStatus}
      updateError={updateError}
      onInputChange={handleInputChange}
      onImageChange={handleImageChange}
      onRemoveImage={handleRemoveImage}
      onSubmit={handleSubmit}
      onCloseMessage={() => setMessage({ type: "", text: "" })}
    />
  );
}
