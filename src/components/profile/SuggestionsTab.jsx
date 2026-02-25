import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSugerenciaAsync, selectSugerenciasCreateStatus, selectSugerenciasCreateError, resetCreateStatus } from '../../store/sugerenciasSlice';
import { selectAuthUser } from '../../store/authSlice';
import NotificationModal from '../ui/NotificationModal';
import useNotification from '../../hooks/useNotification';
import '../../assets/styles/SuggestionsTab.css';

export default function SuggestionsTab() {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const createStatus = useSelector(selectSugerenciasCreateStatus);
  const createError = useSelector(selectSugerenciasCreateError);

  const [comentario, setComentario] = useState('');
  const { notification, showNotification, closeNotification } = useNotification();

  useEffect(() => {
    if (createStatus === 'succeeded') {
      setComentario('');
      dispatch(resetCreateStatus());
      showNotification('¡Sugerencia enviada exitosamente! Gracias por tu aporte.');
    } else if (createStatus === 'failed') {
      const errorMsg = Array.isArray(createError) ? createError.join(', ') : createError;
      showNotification(`Error al enviar la sugerencia: ${errorMsg}`);
      dispatch(resetCreateStatus());
    }
  }, [createStatus, createError, dispatch, showNotification]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      showNotification('Debes estar autenticado para enviar una sugerencia');
      return;
    }

    await dispatch(createSugerenciaAsync({
      idUsuario: user.id,
      comentario
    }));
  };

  return (
    <div className="suggestions-tab">
      <div className="card-body ">
        <h6 className="mb-3">
          <i className="bi bi-lightbulb-fill me-2"></i>
          Sugerencias de mejoras
        </h6>
        <p className="text-muted">
          ¿Tienes alguna idea para mejorar nuestra plataforma? ¡Nos encantaría escucharla!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="suggestion" className="form-label">
              Tu Sugerencia
            </label>
            <textarea
              className="form-control"
              id="suggestion"
              rows="4"
              placeholder="Comparte tus ideas para mejorar..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn-buscar"
            disabled={createStatus === 'loading'}
          >
            <i className="bi bi-send me-2"></i>
            {createStatus === 'loading' ? 'Enviando...' : 'Enviar Sugerencia'}
          </button>
        </form>
      </div>

      <NotificationModal
        message={notification.message}
        isOpen={notification.isOpen}
        onClose={closeNotification}
      />
    </div>
  );
}
