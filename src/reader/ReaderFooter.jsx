export default function ReaderFooter({
    theme,
    currentIndex,
    totalPages,
    onIndexChange
}) {
    const footerBg = theme === 'dark' ? '#0f172a' : '#ffffff';
    const footerText = theme === 'dark' ? '#94a3b8' : '#64748b';
    const accentColor = '#6366f1';
    
    return (
        <div className="reader-footer" style={{
            padding: '12px 24px',
            background: footerBg,
            color: footerText,
            borderTop: '1px solid rgba(99, 102, 241, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            fontSize: '0.9rem',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.1)'
        }}>
            <input
                type="range"
                className="reader-slider"
                min="0"
                max={totalPages - 1}
                value={currentIndex}
                onChange={(e) => onIndexChange(parseInt(e.target.value))}
                style={{
                    flex: 1,
                    accentColor: accentColor,
                    cursor: 'pointer',
                    border: 'none',
                    height: '6px',
                    borderRadius: '3px',
                    background: theme === 'dark' ? '#334155' : '#e2e8f0'
                }}
            />

            <span style={{
                minWidth: '90px',
                textAlign: 'right',
                fontWeight: '600',
                color: theme === 'dark' ? '#fff' : '#1e293b',
                fontSize: '0.95rem'
            }}>
                {currentIndex + 1} / {totalPages}
            </span>
        </div>
    );
}