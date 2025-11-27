export default function ReaderHeader({
    theme,
    title,
    onToggleToc,
    onToggleSettings,
    onClose
}) {
    return (
        <div className="reader-header" style={{
            padding: '10px 20px',
            background: theme === 'dark' ? '#1a1a1a' : 'linear-gradient(90deg, #4b2626 60%, #8b5e3c 100%)',
            color: '#fff',
            borderBottom: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1060,
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}>
            <div className="d-flex align-items-center gap-3">
                <button
                    className={`btn btn-sm ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-light'}`}
                    onClick={onToggleToc}
                    title="Tabla de Contenido"
                    style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}
                >
                    <i className="bi bi-list"></i>
                </button>

                <h5 style={{
                    margin: 0,
                    maxWidth: '300px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {title || 'Lector'}
                </h5>

                <button
                    className={`btn btn-sm ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-light'}`}
                    onClick={onToggleSettings}
                    title="Configuración de lectura"
                    style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}
                >
                    <i className="bi bi-gear"></i>
                </button>
            </div>

            <button
                className="btn btn-sm"
                onClick={onClose}
                style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}
            >
                <i className="bi bi-x-lg"></i>
            </button>
        </div>
    );
}