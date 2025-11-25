import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAsync } from '../../store/usersSlice';
import { selectAuthUser } from '../../store/authSlice';

export default function ChangePassword() {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setMessage({ type: "", text: "" });
  };

  const togglePassword = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (formData.newPassword.length < 8) {
      setMessage({
        type: "danger",
        text: "La contraseña debe tener al menos 8 caracteres"
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({
        type: "danger",
        text: "Las contraseñas no coinciden"
      });
      return;
    }

    setLoading(true);

    try {
      const result = await dispatch(updateUserAsync({
        id: user.id,
        userData: { contraseña: formData.newPassword }
      }));

      if (updateUserAsync.fulfilled.match(result)) {
        setMessage({
          type: "success",
          text: "Contraseña actualizada correctamente"
        });

        setFormData({
          newPassword: "",
          confirmPassword: ""
        });
      } else {
        setMessage({
          type: "danger",
          text: result.payload?.[0] || "Error al cambiar la contraseña"
        });
      }
    } catch (error) {
      setMessage({
        type: "danger",
        text: "Error al cambiar la contraseña"
      });
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = (password) => {
    if (password.length === 0) return { level: 0, text: "", color: "" };
    if (password.length < 6) return { level: 1, text: "Débil", color: "danger" };
    if (password.length < 8) return { level: 2, text: "Media", color: "warning" };
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password))
      return { level: 2, text: "Media", color: "warning" };
    return { level: 3, text: "Fuerte", color: "success" };
  };

  const strength = passwordStrength(formData.newPassword);

  return (
    <div className="container my-0 p-4">
      <h2 className="fw-bold mb-2 justify-content-center d-flex">
        <i className="bi bi-shield-lock me-2 text-warning"></i>
        Cambiar Contraseña
      </h2>
      <form onSubmit={handleSubmit}>
        {message.text && (
          <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
            <i className={`bi bi-${message.type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2`}></i>
            {message.text}
            <button
              type="button"
              className="btn-close"
              onClick={() => setMessage({ type: "", text: "" })}
            ></button>
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label fw-bold">
            <i className="bi bi-shield-check me-2"></i>
            Nueva Contraseña
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              type={showPasswords.new ? "text" : "password"}
              className="form-control"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Ingresa una nueva contraseña"
              disabled={loading}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => togglePassword("new")}
              disabled={loading}
            >
              <i className={`bi bi-eye${showPasswords.new ? '-slash' : ''}`}></i>
            </button>
          </div>
          {formData.newPassword && (
            <div className="mt-2">
              <div className="progress" style={{ height: "5px" }}>
                <div
                  className={`progress-bar bg-${strength.color}`}
                  style={{ width: `${(strength.level / 3) * 100}%` }}
                ></div>
              </div>
              <small className={`text-${strength.color}`}>
                Fortaleza: {strength.text}
              </small>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="form-label fw-bold">
            <i className="bi bi-check-circle me-2"></i>
            Confirmar Nueva Contraseña
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              type={showPasswords.confirm ? "text" : "password"}
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Vuelve a escribir la nueva contraseña"
              disabled={loading}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => togglePassword("confirm")}
              disabled={loading}
            >
              <i className={`bi bi-eye${showPasswords.confirm ? '-slash' : ''}`}></i>
            </button>
          </div>
        </div>

        <div className="alert alert-info mb-4">
          <h6 className="alert-heading">
            <i className="bi bi-info-circle me-2"></i>
            Requisitos de Contraseña:
          </h6>
          <ul className="mb-0 small">
            <li>Al menos 8 caracteres</li>
            <li>Una letra mayúscula y una minúscula</li>
            <li>Al menos un número</li>
          </ul>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="button"
            onClick={() => setFormData({
              newPassword: "",
              confirmPassword: ""
            })}
            disabled={loading}
          >
            <i className="bi bi-x-circle me-2"></i>
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-buscar"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Guardando...
              </>
            ) : (
              <>
                <i className="bi bi-save me-2"></i>
                Guardar Cambios
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}