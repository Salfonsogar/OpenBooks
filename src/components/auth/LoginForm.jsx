import AuthForm from "./AuthForm";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/styles/LoginForm.css";
import { useDispatch, useSelector } from 'react-redux';
import { selectAllRoles } from '../../store/rolesSlice';
import { loginAsync, selectAuthError, selectAuthStatus } from '../../store/authSlice';

export default function LoginForm({ onClickTitle, onForgotPassword, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roles = useSelector(selectAllRoles);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const correo = formData.get('correo');
    const contrasena = formData.get('contraseña');

    try {
      const res = await dispatch(loginAsync({ correo, contrasena }));
      if (loginAsync.fulfilled.match(res)) {
        const user = res.payload?.usuario || res.payload?.Usuario;

        const userRoleObj = roles.find(r => r.id === user?.rolId);
        const roleName = userRoleObj?.name || "";

        try { if (onClose) onClose(); } catch {
          console.error('LoginForm onClose error');
        }

        if (String(roleName).toLowerCase() === 'administrador') navigate('/Admin');
        else navigate('/Profile');
      }
    } catch (err) {
      console.error('LoginForm submit error', err);
    }
  };

  const authError = useSelector(selectAuthError);
  const authStatus = useSelector(selectAuthStatus);


  return (
    <AuthForm title="Iniciar sesión" buttonText="Entrar" onClickTitle={onClickTitle} onSubmit={handleSubmit} className="login-form">
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

