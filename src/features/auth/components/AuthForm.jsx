export default function AuthForm({
  title,
  onClickTitle,
  children,
  buttonText,
  onSubmit,
}) {
  const type = title.toLowerCase().replace(" ", "");

  const handleSubmit = (e) => {
    if (onSubmit) return onSubmit(e);
    e.preventDefault();
  };

  return (
    <form className={`auth-form auth-form-${type}`} onSubmit={handleSubmit}>
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
