import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";
import "../../assets/styles/LoginForm.css";

export default function LoginForm({ onClickTitle, onForgotPassword }) {
  return (
    <AuthForm title="Iniciar sesión" buttonText="Entrar" onClickTitle={onClickTitle} className="login-form">
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
    </AuthForm>
  );
}

