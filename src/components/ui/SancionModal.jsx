import { useState } from 'react';

export default function SancionModal({ show, onClose, onSubmit, isLoading, denunciadoNombre }) {
    const [duracion, setDuracion] = useState('');
    const [comentario, setComentario] = useState('');

    if (!show) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ duracion: parseInt(duracion), comentario });
    };

    const handleClose = () => {
        setDuracion('');
        setComentario('');
        onClose();
    };

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Crear Sanción</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label fw-bold">Usuario a sancionar</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={denunciadoNombre}
                                    disabled
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Duración (días)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={duracion}
                                    onChange={(e) => setDuracion(e.target.value)}
                                    placeholder="Ej: 7, 30, 90"
                                    required
                                    min="1"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Comentario</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={comentario}
                                    onChange={(e) => setComentario(e.target.value)}
                                    placeholder="Describe el motivo de la sanción..."
                                    required
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-danger" disabled={isLoading}>
                                {isLoading ? 'Creando...' : 'Crear Sanción'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
