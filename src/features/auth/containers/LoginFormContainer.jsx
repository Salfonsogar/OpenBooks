import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAllRoles } from '../store/rolesSlice';
import { loginAsync } from '../store/authSlice';
import LoginFormUI from '../components/LoginForm';

export default function LoginFormContainer({ onClickTitle, onForgotPassword, onClose }) {
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

        try { if (onClose) onClose(); } catch { }

        if (String(roleName).toLowerCase() === 'administrador') navigate('/Admin');
        else navigate('/Profile');
      }
    } catch (err) {
      console.error('LoginForm submit error', err);
    }
  };

  return (
    <LoginFormUI
      onClickTitle={onClickTitle}
      onForgotPassword={onForgotPassword}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
