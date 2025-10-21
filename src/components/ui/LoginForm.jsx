import AuthForm from "./AuthForm";

export default function LoginForm({ onClickTitle }) {
  return (
    <AuthForm title="Iniciar sesión" buttonText="Entrar" onClickTitle={onClickTitle}>
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

