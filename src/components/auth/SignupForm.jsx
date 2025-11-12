import AuthForm from "./AuthForm";

export default function SignupForm({ onClickTitle }) {
  return (
    <AuthForm title="Registrarse" buttonText="Crear cuenta" onClickTitle={onClickTitle}>
      <input
        type="text"
        name="nombreUsuario"
        placeholder="Nombre de usuario"
        required
      />
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
    </AuthForm>
  );
}

