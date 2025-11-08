import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [emailSent, setEmailSent] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!email.trim()) {
      setMessage({ 
        type: "danger", 
        text: "Por favor ingresa tu correo electrónico" 
      });
      return;
    }

    if (!isValidEmail(email)) {
      setMessage({ 
        type: "danger", 
        text: "Por favor ingresa un correo electrónico válido" 
      });
      return;
    }

    setLoading(true);

    try {
      await fetch("/api/auth/recover-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email.trim().toLowerCase() }),
      });

      setMessage({ 
        type: "success", 
        text: "Si existe una cuenta con ese correo, recibirás un código de recuperación." 
      });
      setEmailSent(true);

      sessionStorage.setItem("recovery_email", email.trim().toLowerCase());

      setTimeout(() => {
        navigate("/verify-code");
      }, 2000);

    } catch (error) {
      setMessage({ 
        type: "danger", 
        text: "Error de conexión. Verifica tu internet e intenta de nuevo.",
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm p-4" style={{ maxWidth: "450px", width: "100%" }}>

        <div className="text-center mb-4">
          <i className="bi bi-envelope text-primary" style={{ fontSize: "3rem" }}></i>
          <h2 className="mt-3 mb-2">Recuperar contraseña</h2>
          <p className="text-muted small">
            Ingresa tu correo y te enviaremos un código de verificación
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              className={`form-control ${message.type === "danger" ? "is-invalid" : ""}`}
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage({ type: "", text: "" });
              }}
              disabled={loading || emailSent}
              required
              autoFocus
            />
          </div>

          {message.text && (
            <div className={`alert alert-${message.type} mt-3`} role="alert">
              <div className="d-flex align-items-center">
                <i className={`bi bi-${message.type === "success" ? "check-circle" : "exclamation-triangle"} me-2`}></i>
                <span>{message.text}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn-add-bookmark w-100 mt-3"
            disabled={loading || emailSent}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Enviando código...
              </>
            ) : emailSent ? (
              <>
                <i className="bi bi-check-circle me-2"></i>
                Código enviado
              </>
            ) : (
              <>
                <i className="bi bi-send me-2"></i>
                Enviar código
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link 
            to="/login" 
            className="text-decoration-none text-muted"
            style={{ fontSize: "0.9rem" }}
          >
            <i className="bi bi-arrow-left me-1"></i>
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
}