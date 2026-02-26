import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function VerifyCode() {
  const navigate = useNavigate();
  
  const recoveryEmail = sessionStorage.getItem("recovery_email");

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!recoveryEmail) {
      navigate("/forgot-password");
    }
  }, [recoveryEmail, navigate]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split("");
      setCode(newCode);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const fullCode = code.join("");
    
    if (fullCode.length !== 6) {
      setMessage({ 
        type: "danger", 
        text: "Por favor ingresa los 6 dígitos del código" 
      });
      return;
    }

    if (isBlocked) {
      setMessage({ 
        type: "danger", 
        text: "Cuenta bloqueada temporalmente. Intenta de nuevo más tarde." 
      });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/auth/recover-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          identifier: recoveryEmail,
          code: fullCode 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("reset_token", data.token);
        
        setMessage({ 
          type: "success", 
          text: "¡Código verificado! Redirigiendo..." 
        });

        setTimeout(() => {
          navigate("/reset-password");
        }, 1500);
        
      } else {
        if (data.blocked || response.status === 429) {
          setIsBlocked(true);
          setMessage({ 
            type: "danger", 
            text: "Demasiados intentos fallidos. Cuenta bloqueada temporalmente por 15 minutos." 
          });
        } else if (data.error === "CODE_EXPIRED") {
          setMessage({ 
            type: "danger", 
            text: "El código ha expirado. Por favor solicita uno nuevo." 
          });
        } else {
          const newAttempts = attempts + 1;
          setAttempts(newAttempts);
          
          if (newAttempts >= 3) {
            setIsBlocked(true);
            setMessage({ 
              type: "danger", 
              text: "Demasiados intentos. Cuenta bloqueada por 15 minutos." 
            });
          } else {
            setMessage({ 
              type: "danger", 
              text: `Código incorrecto. Te quedan ${3 - newAttempts} intento${3 - newAttempts !== 1 ? "s" : ""}.` 
            });
          }
        }
        setCode(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }

    } catch (error) {
      console.error("Error al verificar código:", error);
      setMessage({ 
        type: "danger", 
        text: "Error de conexión. Verifica tu internet e intenta de nuevo." 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });
    
    try {
      await fetch("/api/auth/recover-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: recoveryEmail }),
      });
      
      setMessage({ 
        type: "success", 
        text: "Nuevo código enviado. Por favor revisa tu correo." 
      });
      setCode(["", "", "", "", "", ""]);
      setAttempts(0);
      setIsBlocked(false);
      inputRefs.current[0]?.focus();
      
    } catch (error) {
      setMessage({ 
        type: "danger", 
        text: "No se pudo enviar el código. Intenta de nuevo.",
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm p-4" style={{ maxWidth: "500px", width: "100%" }}>
        
        <div className="text-center mb-4">
          <i className="bi bi-shield-lock text-primary" style={{ fontSize: "3rem" }}></i>
          <h2 className="mt-3 mb-2">Verificar código</h2>
          <p className="text-muted small">
            Ingresa el código de 6 dígitos enviado a<br/>
            <strong>{recoveryEmail}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div className="d-flex justify-content-center gap-2 mb-4">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                disabled={loading || isBlocked}
                className="form-control text-center fw-bold"
                style={{
                  width: "50px",
                  height: "60px",
                  fontSize: "1.5rem",
                  border: "2px solid #dee2e6"
                }}
                autoFocus={index === 0}
              />
            ))}
          </div>

          {message.text && (
            <div className={`alert alert-${message.type}`} role="alert">
              <div className="d-flex align-items-center">
                <i className={`bi bi-${message.type === "success" ? "check-circle" : "exclamation-triangle"} me-2`}></i>
                <span>{message.text}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn-add-bookmark w-100"
            disabled={loading || isBlocked || code.some(d => !d)}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Verificando...
              </>
            ) : (
              <>
                <i className="bi bi-check-circle me-2"></i>
                Verificar código
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={handleResendCode}
            disabled={loading || isBlocked}
            className="btn btn-link text-decoration-none"
            style={{ fontSize: "0.9rem" }}
          >
            <i className="bi bi-arrow-repeat me-1"></i>
            Reenviar código
          </button>
          
          <div className="mt-2">
            <Link 
              to="/forgot-password" 
              className="text-muted text-decoration-none"
              style={{ fontSize: "0.9rem" }}
            >
              <i className="bi bi-arrow-left me-1"></i>
              Usar otro correo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}