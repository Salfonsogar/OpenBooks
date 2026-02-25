import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAsync } from '../../store/usersSlice';
import { selectAuthUser } from '../../store/authSlice';
import '../../assets/styles/ChangePassword.css';

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
    <div className="profile-password">
      <div className="profile-password__header">
        <div className="profile-password__icon">
          <i className="bi bi-shield-lock"></i>
        </div>
        <div>
          <h4 className="profile-password__title">Cambiar Contraseña</h4>
          <p className="profile-password__subtitle">Actualiza tu contraseña para mantener tu cuenta segura</p>
        </div>
      </div>

      {message.text && (
        <div className={`profile-alert profile-alert--${message.type}`}>
          <i className={`bi bi-${message.type === 'success' ? 'check-circle' : 'exclamation-triangle'}`}></i>
          <span>{message.text}</span>
          <button
            className="profile-alert__close"
            onClick={() => setMessage({ type: "", text: "" })}
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="profile-password__body">
        <div className="profile-password__field">
          <label htmlFor="newPassword" className="profile-password__label">
            <i className="bi bi-shield-check"></i>
            Nueva Contraseña
          </label>
          <div className="profile-password__input-group">
            <span className="profile-password__input-icon">
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              type={showPasswords.new ? "text" : "password"}
              className="profile-password__input"
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
              className="profile-password__toggle"
              onClick={() => togglePassword("new")}
              disabled={loading}
            >
              <i className={`bi bi-eye${showPasswords.new ? '-slash' : ''}`}></i>
            </button>
          </div>
          {formData.newPassword && (
            <div className="profile-password__strength">
              <div className="profile-password__strength-bar">
                <div
                  className={`profile-password__strength-fill profile-password__strength-fill--${strength.color}`}
                  style={{ width: `${(strength.level / 3) * 100}%` }}
                ></div>
              </div>
              <span className={`profile-password__strength-text profile-password__strength-text--${strength.color}`}>
                Fortaleza: {strength.text}
              </span>
            </div>
          )}
        </div>

        <div className="profile-password__field">
          <label htmlFor="confirmPassword" className="profile-password__label">
            <i className="bi bi-check-circle"></i>
            Confirmar Nueva Contraseña
          </label>
          <div className="profile-password__input-group">
            <span className="profile-password__input-icon">
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              type={showPasswords.confirm ? "text" : "password"}
              className="profile-password__input"
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
              className="profile-password__toggle"
              onClick={() => togglePassword("confirm")}
              disabled={loading}
            >
              <i className={`bi bi-eye${showPasswords.confirm ? '-slash' : ''}`}></i>
            </button>
          </div>
        </div>

        <div className="profile-password__requirements">
          <h6>
            <i className="bi bi-info-circle"></i>
            Requisitos de Contraseña:
          </h6>
          <ul>
            <li>Al menos 8 caracteres</li>
            <li>Una letra mayúscula y una minúscula</li>
            <li>Al menos un número</li>
          </ul>
        </div>

        <div className="profile-password__actions">
          <button
            type="button"
            className="profile-password__cancel"
            onClick={() => setFormData({
              newPassword: "",
              confirmPassword: ""
            })}
            disabled={loading}
          >
            <i className="bi bi-x-circle"></i>
            Cancelar
          </button>
          <button
            type="submit"
            className="profile-password__submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="profile-password__spinner"></span>
                Guardando...
              </>
            ) : (
              <>
                <i className="bi bi-save"></i>
                Guardar Cambios
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}