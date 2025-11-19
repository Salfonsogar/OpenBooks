import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordAsync, selectAuthStatus, selectAuthError } from "../store/authSlice";

export default function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const recoveryEmail = sessionStorage.getItem("recovery_email");
  const resetToken = sessionStorage.getItem("reset_token");

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [validations, setValidations] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    match: false
  });

  useEffect(() => {
    if (!recoveryEmail || !resetToken) {
      navigate("/forgot-password");
    }
  }, [recoveryEmail, resetToken, navigate]);

  useEffect(() => {
    const { newPassword, confirmPassword } = formData;
    
    setValidations({
      minLength: newPassword.length >= 8,
      hasUpperCase: /[A-Z]/.test(newPassword),
      hasLowerCase: /[a-z]/.test(newPassword),
      hasNumber: /\d/.test(newPassword),
      match: newPassword === confirmPassword && newPassword !== ""
    });
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setMessage({ type: "", text: "" });
  };

  const toggleShowPassword = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const isFormValid = () => {
    return Object.values(validations).every(v => v === true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validations.minLength) {
      setMessage({ 
        type: "danger", 
        text: "La contraseña debe tener al menos 8 caracteres" 
      });
      return;
    }

    if (!validations.match) {
      setMessage({ 
        type: "danger", 
        text: "Las contraseñas no coinciden" 
      });
      return;
    }

    try {
      await dispatch(resetPasswordAsync({ token: resetToken, nuevaContraseña: formData.newPassword })).unwrap();
      setMessage({ type: "success", text: "¡Contraseña cambiada exitosamente! Redirigiendo al inicio de sesión..." });
      sessionStorage.removeItem("recovery_email");
      sessionStorage.removeItem("reset_token");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (typeof error === 'string' && error.toLowerCase().includes("token")) {
        setMessage({ type: "danger", text: "El token ha expirado. Por favor inicia el proceso nuevamente." });
        setTimeout(() => {
          sessionStorage.clear();
          navigate("/forgot-password");
        }, 3000);
      } else {
        setMessage({ type: "danger", text: error || "Error al cambiar la contraseña. Intenta de nuevo." });
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm p-4" style={{ maxWidth: "500px", width: "100%" }}>
        
        {/* Header */}
        <div className="text-center mb-4">
          <i className="bi bi-key text-primary" style={{ fontSize: "3rem" }}></i>
          <h2 className="mt-3 mb-2">Nueva contraseña</h2>
          <p className="text-muted small">
            Crea una contraseña segura para<br/>
            <strong>{recoveryEmail}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              Nueva contraseña
            </label>
            <div className="input-group">
              <input
                id="newPassword"
                name="newPassword"
                type={showPassword.new ? "text" : "password"}
                className="form-control"
                placeholder="Mínimo 8 caracteres"
                value={formData.newPassword}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => toggleShowPassword("new")}
                disabled={loading}
              >
                <i className={`bi bi-eye${showPassword.new ? "-slash" : ""}`}></i>
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar contraseña
            </label>
            <div className="input-group">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword.confirm ? "text" : "password"}
                className="form-control"
                placeholder="Repite tu contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => toggleShowPassword("confirm")}
                disabled={loading}
              >
                <i className={`bi bi-eye${showPassword.confirm ? "-slash" : ""}`}></i>
              </button>
            </div>
          </div>

          <div className="card bg-light mb-4">
            <div className="card-body">
              <small className="text-muted d-block mb-2 fw-bold">
                Tu contraseña debe tener:
              </small>
              <ul className="list-unstyled mb-0 small">
                <li className={validations.minLength ? "text-success" : "text-muted"}>
                  <i className={`bi bi-${validations.minLength ? "check-circle-fill" : "circle"} me-2`}></i>
                  Al menos 8 caracteres
                </li>
                <li className={validations.hasUpperCase ? "text-success" : "text-muted"}>
                  <i className={`bi bi-${validations.hasUpperCase ? "check-circle-fill" : "circle"} me-2`}></i>
                  Una letra mayúscula
                </li>
                <li className={validations.hasLowerCase ? "text-success" : "text-muted"}>
                  <i className={`bi bi-${validations.hasLowerCase ? "check-circle-fill" : "circle"} me-2`}></i>
                  Una letra minúscula
                </li>
                <li className={validations.hasNumber ? "text-success" : "text-muted"}>
                  <i className={`bi bi-${validations.hasNumber ? "check-circle-fill" : "circle"} me-2`}></i>
                  Un número
                </li>
                <li className={validations.match ? "text-success" : "text-muted"}>
                  <i className={`bi bi-${validations.match ? "check-circle-fill" : "circle"} me-2`}></i>
                  Las contraseñas coinciden
                </li>
              </ul>
            </div>
          </div>

          {message.text && (
            <div className={`alert alert-${message.type}`} role="alert">
              <div className="d-flex align-items-center">
                <i className={`bi bi-${message.type === "success" ? "check-circle" : "exclamation-triangle"} me-2`}></i>
                <span>{message.text}</span>
              </div>
            </div>
          )}
          {status === 'loading' && (
            <div className="alert alert-info mt-2" role="alert">
              Procesando solicitud...
            </div>
          )}
          {error && status === 'failed' && !message.text && (
            <div className="alert alert-danger mt-2" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-add-bookmark w-100"
            disabled={status === 'loading' || !isFormValid()}
          >
            {status === 'loading' ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Guardando...
              </>
            ) : (
              <>
                <i className="bi bi-check-circle me-2"></i>
                Cambiar contraseña
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => {
              sessionStorage.clear();
              navigate("/login");
            }}
            className="text-muted text-decoration-none btn btn-link"
            style={{ fontSize: "0.9rem" }}
          >
            Cancelar y volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}