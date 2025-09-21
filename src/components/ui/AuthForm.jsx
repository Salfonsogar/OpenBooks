export default function AuthForm({
  title,
  onClickTitle,
  children,
  buttonText,
}) {
  const type = title.toLowerCase().replace(" ", ""); // "login" o "signup"

  return (
    <form
      className={`auth-form auth-form-${type}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <label className={`form-title ${type}-title`} onClick={onClickTitle}>
        {title}
      </label>
      {children}
      <button type="submit" className="btn-main">
        {buttonText}
      </button>
    </form>
  );
}
