import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        credentials: "include", // si usas cookies/sesión
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        // limpiar almacenamiento y redirigir al login
        localStorage.clear();
        sessionStorage.clear();
        // opcional: puedes mostrar un mensaje en /login via state
        navigate("/login", { state: { message: "Tu cuenta ha sido eliminada correctamente." } });
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
    <div className="modal-overlay">
      <div className="modal-content p-4">
        <div className="modal-body text-center">
        <h4 className="text-danger fw-bold mb-3">¡Acción irreversible!</h4>
        <p className="text-muted">
            Esta acción <strong>eliminará permanentemente</strong> tu cuenta,
            incluyendo datos, progreso y libros guardados. No podrás recuperarla.
        </p>

        <div className="form-check mt-3">
            <input
            type="checkbox"
            className="form-check-input"
            id="confirm"
            onChange={(e) => setChecked(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="confirm">
            Estoy de acuerdo en eliminar mi cuenta de forma irreversible
            </label>
        </div>
        </div>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        <div className="modal-footer d-flex justify-content-between">
            <button className="button" onClick={onClose}>
                Cancelar
            </button>
            <button
                className="btn-buscar"
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
