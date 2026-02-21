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
    const headerBg = theme === 'dark' ? '#0f172a' : '#1e293b';
    const headerText = '#fff';
    
    return (
        <div className="reader-header" style={{
            padding: '12px 24px',
            backgroundColor: headerBg,
            color: headerText,
            borderBottom: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1060,
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}>
            <div className="d-flex align-items-center gap-3">
                <button
                    className="reader-btn"
                    onClick={onToggleToc}
                    title="Tabla de Contenido"
                    style={{
                        borderColor: 'rgba(255,255,255,0.3)',
                        color: headerText,
                        backgroundColor: 'transparent'
                    }}
                >
                    <i className="bi bi-list"></i>
                </button>

                <button
                    className="reader-btn"
                    onClick={onToggleBookmarks}
                    title="Marcadores"
                    style={{ borderColor: 'rgba(255,255,255,0.3)', color: headerText }}
                >
                    <i className="bi bi-bookmarks"></i>
                </button>

                <button
                    className="reader-btn"
                    onClick={onAddBookmark}
                    title={isBookmarked ? "Quitar marcador" : "Añadir marcador"}
                    style={{
                        borderColor: 'rgba(255,255,255,0.3)',
                        color: isBookmarked ? '#fbbf24' : headerText,
                        backgroundColor: isBookmarked ? 'rgba(251, 191, 36, 0.15)' : 'transparent'
                    }}
                >
                    <i className={`bi ${isBookmarked ? 'bi-star-fill' : 'bi-star'}`}></i>
                </button>

                <h5 style={{
                    margin: 0,
                    maxWidth: '300px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontWeight: 500,
                    fontSize: '1rem'
                }}>
                    {title || 'Lector'}
                </h5>

                <button
                    className="reader-btn"
                    onClick={onToggleSettings}
                    title="Configuración de lectura"
                    style={{ borderColor: 'rgba(255,255,255,0.3)', color: headerText }}
                >
                    <i className="bi bi-gear"></i>
                </button>
            </div>

            <button
                className="reader-btn-close"
                onClick={onClose}
                style={{ color: headerText, borderColor: 'rgba(255,255,255,0.3)' }}
            >
                <i className="bi bi-x-lg"></i>
            </button>
        </div>
    );
}