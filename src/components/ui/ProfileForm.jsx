import UserCard from "./UserCard";
import { useState } from "react";

const ProfileForm = ({ userData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: userData.nombre || "",
    email: userData.email || "",
    bio: userData.bio || "",
    intereses: userData.intereses || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  const mockUserData = {
    nombre: "María García",
    email: "maria@example.com",
    role: "Usuario",
    avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    bio: "Amante de la literatura clásica y moderna. Administradora de la biblioteca digital.",
    intereses: "Literatura, Historia, Filosofía",
    librosLeidos: 24,
    enProgreso: 8,
    horasTotales: 156
  };

  return (

    <div className="min-vh-100 bg-light py-4">
        <div className="container">
            <h1 className="display-5 fw-bold mb-2">
                <i className="bi bi-person-lines-fill me-2"></i> Editar Perfil</h1>
            <div className="row gß4">
                <div className="col-lg-4 mt-4 mt-lg-0">
                    <UserCard
                      imgSrc={mockUserData.avatar}
                      name={mockUserData.nombre}
                      email={mockUserData.email}
                      role={mockUserData.role}
                      showSettingsButton={false}
                    />
                </div>
                <div className="col-lg-8">
                    <div className="card shadow-sm p-4 mt-4 mt-lg-0">
                        <form onSubmit={handleSubmit} className="p-3 bg-light rounded shadow-sm">
                      <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">
                          <i className="bi bi-person me-2"></i>
                          Nombre Completo
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          placeholder="Tu nombre completo"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          <i className="bi bi-envelope me-2"></i>
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="usuario@ejemplo.com"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="bio" className="form-label">
                          <i className="bi bi-file-text me-2"></i>
                          Biografía
                        </label>
                        <textarea
                          className="form-control"
                          id="bio"
                          name="bio"
                          rows="3"
                          value={formData.bio}
                          onChange={handleInputChange}
                          placeholder="Contanos algo sobre vos..."
                        ></textarea>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="intereses" className="form-label">
                          <i className="bi bi-star me-2"></i>
                          Intereses
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="intereses"
                          name="intereses"
                          value={formData.intereses}
                          onChange={handleInputChange}
                          placeholder="Lectura, escritura, tecnología..."
                        />
                      </div>

                      <div className="d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          className="btn-add-bookmark btn-cancel"
                          onClick={onCancel}
                        >
                          Cancelar
                        </button>
                        <button type="submit" className="btn-add-bookmark">
                          <i className="bi bi-save me-2"></i>
                          Guardar Cambios
                        </button>
                      </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProfileForm;
