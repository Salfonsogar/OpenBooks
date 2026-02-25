import "./reader.css"
import { Link } from 'react-router-dom';

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
    const headerBg = theme === 'dark' ? '#0f172a' : '#fff';
    const headerText = theme === 'dark' ? '#fff' : '#0f172a';

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
        }}>
            <div className="d-flex align-items-center gap-3">
                <Link className="navbar-brand text-white" to="/"
                    onClick={onClose}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
                        alt="Logo"
                        width="40"
                        height="32"
                        className="d-inline-block align-text-top me-2"
                        style={{
                            filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none'
                        }}
                    />
                </Link>
                <h5 style={{
                    margin: 0,
                    maxWidth: '300px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontWeight: 500,
                    fontSize: '2rem'
                }}>
                    {title || 'Lector'}
                </h5>
            </div>


            <div className="d-flex align-items-center gap-3 ">
                <button
                    className="reader-btn"
                    onClick={onToggleToc}
                    title="Tabla de Contenido"
                    style={{
                        borderColor: 'rgba(255,255,255,0.3)',
                        color: headerText,
                        backgroundColor: 'transparent',
                        border: 'none'
                    }}
                >
                    <i className="bi bi-list"
                        style={{ fontSize: '1.5rem' }}></i>
                </button>

                <button
                    className="reader-btn"
                    onClick={onToggleBookmarks}
                    title="Marcadores"
                    style={{
                        borderColor: 'rgba(255,255,255,0.3)', color: headerText,
                        border: 'none'
                    }}
                >
                    <i className="bi bi-bookmarks"
                        style={{ fontSize: '1.5rem' }}></i>
                </button>

                <button
                    className="reader-btn"
                    onClick={onAddBookmark}
                    title={isBookmarked ? "Quitar marcador" : "Añadir marcador"}
                    style={{
                        borderColor: 'rgba(255,255,255,0.3)',
                        color: isBookmarked ? '#fbbf24' : headerText,
                        backgroundColor: isBookmarked ? 'rgba(251, 191, 36, 0.15)' : 'transparent',
                        border: 'none'
                    }}
                >
                    <i className={`bi ${isBookmarked ? 'bi-star-fill' : 'bi-star'}`}
                        style={{ fontSize: '1.5rem' }}></i>
                </button>
                <button
                    className="reader-btn"
                    onClick={onToggleSettings}
                    title="Configuración de lectura"
                    style={{
                        borderColor: 'rgba(255,255,255,0.3)', color: headerText,
                        border: 'none'
                    }}
                >
                    <i className="bi bi-gear"
                        style={{ fontSize: '1.5rem' }}></i>
                </button>
            </div>
        </div>
    );
}