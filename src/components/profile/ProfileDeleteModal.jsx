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
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1055,
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "420px",
          borderRadius: "12px",
          animation: "fadeIn 0.3s ease-in-out",
        }}
        onClick={(e) => e.stopPropagation()} >
        <div className="text-center">
          <i
            className="bi bi-exclamation-triangle-fill text-danger"
            style={{ fontSize: "3rem" }}
          ></i>
          <h4 className="text-danger fw-bold mt-3">¡Acción irreversible!</h4>
          <p className="text-muted mt-2">
            Esta acción <strong>eliminará permanentemente</strong> tu cuenta, incluyendo tus datos,
            progreso y libros guardados. No podrás recuperarla.
          </p>
        </div>
        <div className="form-check d-flex align-items-center mt-3">
          <input
            type="checkbox"
            className="form-check-input me-2"
            id="confirm"
            onChange={(e) => setChecked(e.target.checked)}
          />
          <label
            className="form-check-label text-muted"
            htmlFor="confirm"
            style={{ lineHeight: "1.4", cursor: "pointer" }}
          >
            Estoy de acuerdo en eliminar mi cuenta de forma irreversible
          </label>
        </div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <button className="button " onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn btn-danger"
            disabled={!checked || loading}
            onClick={handleDelete}
          >
            {loading ? "Eliminando..." : "Eliminar cuenta"}
          </button>
        </div>
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .btn-danger {
            color: red;
            }
            .btn-danger:hover {
            background-color: #9c0720 !important;
            }
          `}
        </style>
      </div>
    </div>
  );
}
