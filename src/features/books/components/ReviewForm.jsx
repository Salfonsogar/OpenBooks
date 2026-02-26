import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createReviewAsync,
  selectCreateStatus,
  selectCreateError,
  resetCreateStatus
} from "../../store/reviewsSlice";
import { selectAuthUser } from "../../store/authSlice";

export default function ReviewForm({ bookId }) {
  const [texto, setTexto] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const createStatus = useSelector(selectCreateStatus);
  const createError = useSelector(selectCreateError);

  useEffect(() => {
    if (createStatus === 'succeeded') {
      setTexto("");
      dispatch(resetCreateStatus());
    }
  }, [createStatus, dispatch]);

  if (!user) {
    return (
      <div className="alert alert-warning mt-3">
        <i className="bi bi-exclamation-triangle me-2"></i>
        Debes iniciar sesión para escribir una reseña.
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!texto.trim()) return;

    await dispatch(createReviewAsync({
      idLibro: bookId,
      texto: texto
    }));
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">
          <i className="bi bi-pencil-square me-2"></i>
          Agregar reseña
        </h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Escribe tu reseña..."
              rows={4}
              disabled={createStatus === 'loading'}
              required
            />
          </div>

          {createStatus === 'failed' && createError && (
            <div className="alert alert-danger">
              {Array.isArray(createError) ? createError.join(', ') : createError}
            </div>
          )}

          {createStatus === 'succeeded' && (
            <div className="alert alert-success">
              <i className="bi bi-check-circle me-2"></i>
              Reseña publicada correctamente
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={createStatus === 'loading' || !texto.trim()}
          >
            {createStatus === 'loading' ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Enviando...
              </>
            ) : (
              <>
                <i className="bi bi-send me-2"></i>
                Enviar
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
