export default function ReaderSettingsPanel({
    show,
    theme,
    fontSize,
    lineHeight,
    marginMode,
    onFontSizeDecrease,
    onFontSizeIncrease,
    onLineHeightChange,
    onMarginModeChange,
    onThemeChange
}) {
    if (!show) return null;

    return (
        <div className="settings-panel shadow p-3 rounded" style={{
            position: 'absolute',
            top: '60px',
            left: '60px',
            backgroundColor: theme === 'dark' ? '#2c2c2c' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
            zIndex: 1070,
            width: '250px'
        }}>
            <div className="mb-3">
                <label className="form-label small">Tamaño de letra</label>
                <div className="btn-group btn-group-sm w-100">
                    <button className="btn btn-outline-secondary" onClick={onFontSizeDecrease}>
                        A-
                    </button>
                    <span className="btn btn-outline-secondary disabled">{fontSize}%</span>
                    <button className="btn btn-outline-secondary" onClick={onFontSizeIncrease}>
                        A+
                    </button>
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label small">Interlineado</label>
                <div className="btn-group btn-group-sm w-100">
                    <button
                        className={`btn ${lineHeight === 1.2 ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => onLineHeightChange(1.2)}
                    >
                        1.2
                    </button>
                    <button
                        className={`btn ${lineHeight === 1.6 ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => onLineHeightChange(1.6)}
                    >
                        1.6
                    </button>
                    <button
                        className={`btn ${lineHeight === 2.0 ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => onLineHeightChange(2.0)}
                    >
                        2.0
                    </button>
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label small">Ancho</label>
                <div className="btn-group btn-group-sm w-100">
                    <button
                        className={`btn ${marginMode === 'narrow' ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => onMarginModeChange('narrow')}
                        title="Estrecho"
                    >
                        <i className="bi bi-layout-three-columns"></i>
                    </button>
                    <button
                        className={`btn ${marginMode === 'normal' ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => onMarginModeChange('normal')}
                        title="Normal"
                    >
                        <i className="bi bi-layout-text-window-reverse"></i>
                    </button>
                    <button
                        className={`btn ${marginMode === 'wide' ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => onMarginModeChange('wide')}
                        title="Ancho"
                    >
                        <i className="bi bi-arrows-fullscreen"></i>
                    </button>
                </div>
            </div>

            <div className="mb-2">
                <label className="form-label small">Tema</label>
                <div className="d-flex justify-content-between">
                    <button
                        className={`btn btn-sm rounded-circle border ${theme === 'light' ? 'ring-2 ring-primary' : ''}`}
                        style={{ width: 30, height: 30, background: '#fff' }}
                        onClick={() => onThemeChange('light')}
                    />
                    <button
                        className={`btn btn-sm rounded-circle border ${theme === 'sepia' ? 'ring-2 ring-primary' : ''}`}
                        style={{ width: 30, height: 30, background: '#f4ecd8' }}
                        onClick={() => onThemeChange('sepia')}
                    />
                    <button
                        className={`btn btn-sm rounded-circle border ${theme === 'dark' ? 'ring-2 ring-primary' : ''}`}
                        style={{ width: 30, height: 30, background: '#1a1a1a' }}
                        onClick={() => onThemeChange('dark')}
                    />
                </div>
            </div>
        </div>
    );
}