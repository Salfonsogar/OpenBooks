import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/authModal.css"; 
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="auth-overlay" onClick={handleClose}>
      <div className="auth-main" onClick={(e) => e.stopPropagation()}>
        <div className={`auth-signup ${isLogin ? "inactive" : ""}`}>
          <SignupForm onClickTitle={() => setIsLogin(false)} />
        </div>

        <div className={`auth-login ${isLogin ? "active" : ""}`}>
          <LoginForm onClickTitle={() => setIsLogin(true)}
            onForgotPassword={handleClose} onClose={handleClose} />
        </div>

        <button className="auth-close-btn" onClick={handleClose}>
          ×
        </button>
      </div>
    </div>
  );
}
