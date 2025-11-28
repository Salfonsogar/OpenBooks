export default function ReaderBookmarksSidebar({
    show,
    theme,
    bookmarks,
    onClose,
    onItemClick,
    onRemoveBookmark
}) {
    if (!show) return null;

    return (
        <div className="bookmarks-sidebar shadow" style={{
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
                <h6 className="m-0">Marcadores</h6>
                <button className="btn btn-sm btn-close" onClick={onClose}></button>
            </div>
            <div className="list-group list-group-flush">
                {bookmarks && bookmarks.length > 0 ? (
                    bookmarks.map((item) => (
                        <div
                            key={item.index}
                            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${theme === 'dark' ? 'bg-dark text-light border-secondary' : ''
                                }`}
                        >
                            <div
                                onClick={() => onItemClick(item.index)}
                                style={{ cursor: 'pointer', flex: 1 }}
                            >
                                <div className="fw-bold">{item.title}</div>
                                <small className="text-muted">
                                    {new Date(item.timestamp).toLocaleDateString()}
                                </small>
                            </div>
                            <button
                                className="btn btn-sm btn-outline-danger border-0"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveBookmark(item.index);
                                }}
                                title="Eliminar marcador"
                            >
                                <i className="bi bi-trash"></i>
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="p-3 text-muted text-center">
                        <i className="bi bi-bookmark mb-2 d-block" style={{ fontSize: '2rem' }}></i>
                        No tienes marcadores guardados
                    </div>
                )}
            </div>
        </div>
    );
}
