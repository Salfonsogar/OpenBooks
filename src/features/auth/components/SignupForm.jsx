import AuthForm from "./AuthForm";

export default function SignupFormUI({ onClickTitle, onSubmit, status, error, success }) {
  return (
    <>
      <AuthForm
        title="Registrarse"
        buttonText={status === 'loading' ? "Registrando..." : "Crear cuenta"}
        onClickTitle={onClickTitle}
        onSubmit={onSubmit}
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
