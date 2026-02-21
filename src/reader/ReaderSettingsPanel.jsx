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

    const panelBg = theme === 'dark' ? '#1e293b' : '#ffffff';
    const textColor = theme === 'dark' ? '#f1f5f9' : '#1e293b';
    
    return (
        <div className="settings-panel" style={{
            position: 'absolute',
            top: '70px',
            left: '20px',
            backgroundColor: panelBg,
            color: textColor,
            zIndex: 1070,
            width: '280px',
            padding: '20px',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
        }}>
            <h6 style={{ 
                marginBottom: '20px', 
                fontWeight: 600,
                fontSize: '1rem',
                color: textColor,
                borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
                paddingBottom: '12px'
            }}>
                Configuración
            </h6>
            
            <div className="mb-4">
                <label className="form-label small" style={{ 
                    color: theme === 'dark' ? '#94a3b8' : '#64748b',
                    fontWeight: 500,
                    marginBottom: '10px',
                    display: 'block'
                }}>Tamaño de letra</label>
                <div className="d-flex align-items-center gap-2">
                    <button 
                        className="font-size-btn" 
                        onClick={onFontSizeDecrease}
                        style={theme === 'dark' ? {borderColor: '#475569', color: '#f1f5f9'} : {}}
                    >
                        A-
                    </button>
                    <span style={{ 
                        flex: 1, 
                        textAlign: 'center', 
                        fontWeight: 600,
                        color: '#6366f1'
                    }}>{fontSize}%</span>
                    <button 
                        className="font-size-btn" 
                        onClick={onFontSizeIncrease}
                        style={theme === 'dark' ? {borderColor: '#475569', color: '#f1f5f9'} : {}}
                    >
                        A+
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <label className="form-label small" style={{ 
                    color: theme === 'dark' ? '#94a3b8' : '#64748b',
                    fontWeight: 500,
                    marginBottom: '10px',
                    display: 'block'
                }}>Interlineado</label>
                <div className="d-flex gap-2">
                    {[
                        { value: 1.2, label: '1.2' },
                        { value: 1.6, label: '1.6' },
                        { value: 2.0, label: '2.0' }
                    ].map(opt => (
                        <button
                            key={opt.value}
                            className={`flex-fill rounded-2 border-0 py-2 px-3 ${lineHeight === opt.value ? 'text-white' : ''}`}
                            onClick={() => onLineHeightChange(opt.value)}
                            style={{
                                background: lineHeight === opt.value ? '#6366f1' : (theme === 'dark' ? '#334155' : '#f1f5f9'),
                                color: lineHeight === opt.value ? '#fff' : (theme === 'dark' ? '#94a3b8' : '#64748b'),
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                fontWeight: 500,
                                fontSize: '0.875rem'
                            }}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label className="form-label small" style={{ 
                    color: theme === 'dark' ? '#94a3b8' : '#64748b',
                    fontWeight: 500,
                    marginBottom: '10px',
                    display: 'block'
                }}>Ancho</label>
                <div className="d-flex gap-2">
                    {[
                        { value: 'narrow', icon: 'bi-layout-three-columns' },
                        { value: 'normal', icon: 'bi-layout-text-window-reverse' },
                        { value: 'wide', icon: 'bi-arrows-fullscreen' }
                    ].map(opt => (
                        <button
                            key={opt.value}
                            className="flex-fill rounded-2 border-0 py-2"
                            onClick={() => onMarginModeChange(opt.value)}
                            style={{
                                background: marginMode === opt.value ? '#6366f1' : (theme === 'dark' ? '#334155' : '#f1f5f9'),
                                color: marginMode === opt.value ? '#fff' : (theme === 'dark' ? '#94a3b8' : '#64748b'),
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                fontSize: '1rem'
                            }}
                        >
                            <i className={`bi ${opt.icon}`}></i>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-2">
                <label className="form-label small" style={{ 
                    color: theme === 'dark' ? '#94a3b8' : '#64748b',
                    fontWeight: 500,
                    marginBottom: '12px',
                    display: 'block'
                }}>Tema</label>
                <div className="d-flex justify-content-between px-2">
                    <button
                        className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                        style={{ 
                            width: 36, 
                            height: 36, 
                            background: '#ffffff',
                            border: theme === 'light' ? '3px solid #6366f1' : '2px solid #e2e8f0'
                        }}
                        onClick={() => onThemeChange('light')}
                        title="Claro"
                    />
                    <button
                        className={`theme-btn ${theme === 'sepia' ? 'active' : ''}`}
                        style={{ 
                            width: 36, 
                            height: 36, 
                            background: '#f4ecd8',
                            border: theme === 'sepia' ? '3px solid #6366f1' : '2px solid #e2e8f0'
                        }}
                        onClick={() => onThemeChange('sepia')}
                        title="Sepia"
                    />
                    <button
                        className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                        style={{ 
                            width: 36, 
                            height: 36, 
                            background: '#0f172a',
                            border: theme === 'dark' ? '3px solid #6366f1' : '2px solid #334155'
                        }}
                        onClick={() => onThemeChange('dark')}
                        title="Oscuro"
                    />
                </div>
            </div>
        </div>
    );
}