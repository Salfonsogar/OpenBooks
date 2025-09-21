import AuthForm from "./AuthForm";

export default function LoginForm({ onClickTitle }) {
  return (
    <AuthForm title="Login" buttonText="Login" onClickTitle={onClickTitle}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
    </AuthForm>
  );
}
