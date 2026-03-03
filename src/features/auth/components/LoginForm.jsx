import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";
import "../styles/loginForm.module.css";
import { useSelector } from 'react-redux';
import { selectAuthError, selectAuthStatus } from '../store/authSlice';

export default function LoginFormUI({ onClickTitle, onForgotPassword, onSubmit }) {
  const authError = useSelector(selectAuthError);
  const authStatus = useSelector(selectAuthStatus);

  return (
    <AuthForm title="Iniciar sesión" buttonText="Entrar" onClickTitle={onClickTitle} onSubmit={onSubmit} className="login-form">
      <input
        type="email"
        name="correo"
        placeholder="Correo electrónico"
        required
      />
      <input
        type="password"
        name="contraseña"
        placeholder="Contraseña"
        required
      />

      <p>
        <Link to="/forgot-password" className="text-dark mb-3 forgot-password-link"
          onClick={onForgotPassword}>
          He olvidado mi contraseña
        </Link>
      </p>
      {authStatus === 'loading' && <div className="text-muted">Iniciando sesión...</div>}
      {authError && <div className="text-danger">{authError}</div>}
    </AuthForm>
  );
}
