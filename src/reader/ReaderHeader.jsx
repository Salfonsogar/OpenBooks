import "./reader.css"

export default function ReaderHeader({
    theme,
    title,
    onToggleToc,
    onToggleSettings,
    onToggleBookmarks,
    onAddBookmark,
    isBookmarked,
    onClose
}) {
    return (
        <div className="reader-header" style={{
            padding: '10px 20px',
            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#4b2626',
            color: '#fff',
            borderBottom: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1060,
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        }}>
            <div className="d-flex align-items-center gap-3">
                <button
                    className={`btn btn-sm ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-light'}`}
                    onClick={onToggleToc}
                    title="Tabla de Contenido"
                    style={{
                        borderColor: 'rgba(255,255,255,0.5)',
                        color: '#fff',
                        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff'
                    }}
                >
                    <i className="bi bi-list"></i>
                </button>

                <button
                    className={`btn btn-sm ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-light'}`}
                    onClick={onToggleBookmarks}
                    title="Marcadores"
                    style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}
                >
                    <i className="bi bi-bookmarks"></i>
                </button>

                <button
                    className={`btn btn-sm ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-light'}`}
                    onClick={onAddBookmark}
                    title={isBookmarked ? "Quitar marcador" : "Añadir marcador"}
                    style={{
                        borderColor: 'rgba(255,255,255,0.5)',
                        color: isBookmarked ? '#ffc107' : '#fff',
                        backgroundColor: isBookmarked ? 'rgba(255, 193, 7, 0.2)' : 'transparent'
                    }}
                >
                    <i className={`bi ${isBookmarked ? 'bi-star-fill' : 'bi-star'}`}></i>
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