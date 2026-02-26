import { useState } from 'react';

export default function ReportModal({ show, onClose, onSubmit, isLoading }) {
    const [reason, setReason] = useState('Spam');
    const [comment, setComment] = useState('');

    if (!show) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalComment = reason === 'Otro' ? comment : `${reason}: ${comment}`;
        onSubmit(finalComment);
    };

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Denunciar Reseña</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Motivo de la denuncia</label>
                                <select
                                    className="form-select"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                >
                                    <option value="Spam">Spam</option>
                                    <option value="Contenido ofensivo">Contenido ofensivo</option>
                                    <option value="Información falsa">Información falsa</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Detalles adicionales</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Describe el problema..."
                                    required={reason === 'Otro'}
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-danger" disabled={isLoading}>
                                {isLoading ? 'Enviando...' : 'Enviar denuncia'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
