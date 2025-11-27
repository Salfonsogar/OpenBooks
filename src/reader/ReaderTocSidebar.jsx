export default function ReaderTocSidebar({ show, theme, toc, onClose, onItemClick }) {
    if (!show) return null;

    return (
        <div className="toc-sidebar shadow" style={{
            position: 'absolute',
            top: '51px',
            left: 0,
            bottom: 0,
            width: '300px',
            backgroundColor: theme === 'dark' ? '#2c2c2c' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
            zIndex: 1065,
            overflowY: 'auto',
            borderRight: '1px solid #ddd'
        }}>
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                <h6 className="m-0">Tabla de Contenido</h6>
                <button className="btn btn-sm btn-close" onClick={onClose}></button>
            </div>
            <div className="list-group list-group-flush">
                {toc && toc.length > 0 ? (
                    toc.map((item, idx) => (
                        <button
                            key={idx}
                            className={`list-group-item list-group-item-action ${theme === 'dark' ? 'bg-dark text-light border-secondary' : ''
                                }`}
                            onClick={() => onItemClick(item.href)}
                        >
                            {item.titulo}
                        </button>
                    ))
                ) : (
                    <div className="p-3 text-muted">No hay índice disponible</div>
                )}
            </div>
        </div>
    );
}