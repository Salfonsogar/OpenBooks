export default function ReaderContent({
    iframeRef,
    iframeSrc,
    theme,
    status,
    hasNext,
    hasPrevious,
    isNavigatingBack,
    onLoad,
    onNextPage,
    onPrevPage
}) {
    return (
        <div className="reader-body" style={{
            flex: 1,
            position: 'relative',
            display: 'flex'
        }}>
            <div
                onClick={onPrevPage}
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '15%',
                    height: '100%',
                    zIndex: 20,
                    cursor: 'pointer'
                }}
                title="Anterior"
            />
            <div
                onClick={onNextPage}
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    width: '15%',
                    height: '100%',
                    zIndex: 20,
                    cursor: 'pointer'
                }}
                title="Siguiente"
            />

            <button
                onClick={onPrevPage}
                className="d-none d-md-block"
                style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 25,
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    opacity: hasPrevious || isNavigatingBack ? 1 : 0.3
                }}
            >
                ←
            </button>

            <div style={{ flex: 1, height: '100%', padding: '0' }}>
                {status === 'loading' && (
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="spinner-border text-primary" role="status"></div>
                    </div>
                )}

                <iframe
                    ref={iframeRef}
                    srcDoc={iframeSrc}
                    onLoad={onLoad}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        backgroundColor: theme === 'dark' ? '#1a1a1a' : (theme === 'sepia' ? '#f4ecd8' : '#fff'),
                        display: status === 'loading' ? 'none' : 'block'
                    }}
                    title="Reader Content"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />
            </div>

            <button
                onClick={onNextPage}
                className="d-none d-md-block"
                style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 25,
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    opacity: hasNext ? 1 : 0.3
                }}
            >
                →
            </button>
        </div>
    );
}