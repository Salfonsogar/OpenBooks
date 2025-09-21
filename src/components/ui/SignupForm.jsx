import AuthForm from "./AuthForm";

export default function SignupForm({ onClickTitle }) {
  return (
    <AuthForm title="Sign up" buttonText="Sign up" onClickTitle={onClickTitle}>
      <input type="text" name="username" placeholder="User name" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="tel" name="phone" placeholder="Phone number" required />
      <input type="password" name="password" placeholder="Password" required />
    </AuthForm>
  );
}
