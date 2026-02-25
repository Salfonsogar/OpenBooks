import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../assets/styles/ProfileDeleteModal.css';

export default function DeleteAccountModal({ onClose }) {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/users/me", {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login", {
          state: { message: "Tu cuenta ha sido eliminada correctamente." },
        });
      } else {
        setError("No se pudo eliminar la cuenta. Intenta de nuevo más tarde.");
      }
    } catch (error) {
      console.error("Error eliminando la cuenta:", error);
      setError("Error de conexión con el servidor, por favor intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="profile-modal-overlay"
      onClick={onClose}
    >
      <div
        className="profile-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="profile-modal__icon">
          <i className="bi bi-exclamation-triangle-fill"></i>
        </div>
        <h4 className="profile-modal__title">¡Acción irreversible!</h4>
        <p className="profile-modal__text">
          Esta acción <strong>eliminará permanentemente</strong> tu cuenta, incluyendo tus datos,
          progreso y libros guardados. No podrás recuperarla.
        </p>
        
        <div className="profile-modal__checkbox">
          <input
            type="checkbox"
            id="confirm"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <label htmlFor="confirm">
            Estoy de acuerdo en eliminar mi cuenta de forma irreversible
          </label>
        </div>
        
        {error && <div className="profile-modal__error">{error}</div>}
        
        <div className="profile-modal__actions">
          <button className="profile-modal__cancel" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="profile-modal__confirm"
            disabled={!checked || loading}
            onClick={handleDelete}
          >
            {loading ? "Eliminando..." : "Eliminar cuenta"}
          </button>
        </div>
      </div>
    </div>
  );
}
