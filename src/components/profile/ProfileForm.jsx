import { useState } from "react";
import UserCard from "../ui/UserCard";

export default function ProfileForm({ userData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: userData?.UserName || "",
    email: userData?.Email || "",
    //No estan en UsuarioResponseDT ni en tabla usuario
    bio: userData?.bio || "",
    intereses: userData?.intereses || "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // API de actualización de perfil
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ 
        type: "success", 
        text: "Perfil actualizado correctamente" 
      });
      
      if (onSubmit) onSubmit(formData);
    } catch (error) {
      setMessage({ 
        type: "danger", 
        text: "Error al actualizar el perfil",
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };
  return (
  <div className="container my-0 d-flex justify-content-center align-items-start ">
    <div className="col-lg-8 p-4 ">
      <div className="mb-4 text-center">
        <h4 className="fw-bold mb-2">
          <i className="bi bi-person-lines-fill me-2 text-primary"></i>
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
          <i
            className={`bi bi-${
              message.type === "success"
                ? "check-circle"
                : "exclamation-triangle"
            } me-2`}
          ></i>
          {message.text}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage({ type: "", text: "" })}
          ></button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nombre" className="form-label fw-bold">
            <i className="bi bi-person me-2"></i>
            Nombre Completo
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Tu nombre completo"
            disabled={loading}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="form-label fw-bold">
            <i className="bi bi-envelope me-2"></i>
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
            disabled={loading}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bio" className="form-label fw-bold">
            <i className="bi bi-file-text me-2"></i>
            Biografía
          </label>
          <textarea
            className="form-control"
            id="bio"
            name="bio"
            rows="4"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Cuéntanos algo sobre ti..."
            disabled={loading}
          ></textarea>
          <small className="text-muted">
            {formData.bio.length}/500 caracteres
          </small>
        </div>

        <div className="mb-4">
          <label htmlFor="intereses" className="form-label fw-bold">
            <i className="bi bi-star me-2"></i>
            Intereses
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="intereses"
            name="intereses"
            value={formData.intereses}
            onChange={handleInputChange}
            placeholder="Lectura, escritura, tecnología..."
            disabled={loading}
          />
          <small className="text-muted">
            Separa tus intereses con comas
          </small>
        </div>

        <div className="d-flex justify-content-end gap-2 pt-3">
          <button
            type="button"
            className="button"
            onClick={onCancel}
            disabled={loading}
          >
            <i className="bi bi-x-circle me-2"></i>
            Cancelar
          </button>
          <button type="submit" className="btn-buscar" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Guardando...
              </>
            ) : (
              <>
                <i className="bi bi-check-circle me-2"></i>
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