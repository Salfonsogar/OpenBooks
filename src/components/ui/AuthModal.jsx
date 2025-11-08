import { useState } from "react";
import "../../assets/styles/AuthModal.css"; 
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-main" onClick={(e) => e.stopPropagation()}>
        <div className={`auth-signup ${isLogin ? "inactive" : ""}`}>
          <SignupForm onClickTitle={() => setIsLogin(false)} />
        </div>

        <div className={`auth-login ${isLogin ? "active" : ""}`}>
          <LoginForm onClickTitle={() => setIsLogin(true)}
          onForgotPassword={onClose} />
        </div>

        <button className="auth-close-btn" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}
