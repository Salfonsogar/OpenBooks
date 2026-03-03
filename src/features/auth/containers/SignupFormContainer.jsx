import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerAsync } from '../store/authSlice';
import { selectAllRoles } from '../store/rolesSlice';
import SignupFormUI from '../components/SignupForm';

export default function SignupFormContainer({ onClickTitle }) {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState("");
  const status = useSelector(state => state.auth.status);
  const error = useSelector(state => state.auth.error);
  const roles = useSelector(selectAllRoles);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    const form = e.target;
    const nombreUsuario = form.nombreUsuario.value;
    const correo = form.correo.value;
    const contraseña = form.contraseña.value;
    const nombreCompleto = form.nombreCompleto.value;

    const userRole = roles.find(r => r.name === 'Usuario' || r.name === 'usuario');
    const rolId = userRole ? userRole.id : 2;

    const result = await dispatch(registerAsync({ nombreUsuario, nombreCompleto, contraseña, correo, rolId }));
    if (registerAsync.fulfilled.match(result)) {
      setSuccess("¡Registro exitoso! Ahora puedes iniciar sesión.");
      form.reset();
    }
  };

  return (
    <SignupFormUI
      onClickTitle={onClickTitle}
      onSubmit={handleSubmit}
      status={status}
      error={error}
      success={success}
    />
  );
}
