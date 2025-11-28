import AuthForm from "./AuthForm";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { registerAsync } from '../../store/authSlice';


import { selectAllRoles } from '../../store/rolesSlice';

export default function SignupForm({ onClickTitle }) {
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
    <>
      <AuthForm
        title="Registrarse"
        buttonText={status === 'loading' ? "Registrando..." : "Crear cuenta"}
        onClickTitle={onClickTitle}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="nombreUsuario"
          placeholder="Nombre de usuario"
          required
          disabled={status === 'loading'}
        />
        <input
          type="text"
          name="nombreCompleto"
          placeholder="Nombre completo"
          required
          disabled={status === 'loading'}
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          required
          disabled={status === 'loading'}
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          required
          disabled={status === 'loading'}
        />
        {error && <div className="text-danger mt-2">{error}</div>}
        {success && <div className="text-success mt-2">{success}</div>}
      </AuthForm>
      <style>
        {`
          .auth-signup .form-title{
            color: #fff !important;
          }
          .auth-login .form-title{
            border-bottom: 1px solid #6e3b3b !important;
          }
        `}
      </style>
    </>
  );
}

