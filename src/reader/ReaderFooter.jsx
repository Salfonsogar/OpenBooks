export default function ReaderFooter({
    theme,
    currentIndex,
    totalPages,
    onIndexChange
}) {
    return (
        <div className="reader-footer" style={{
            padding: '10px 20px',
            background: theme === 'dark' ? '#1a1a1a' : '#fff',
            color: theme === 'dark' ? '#ccc' : '#6c757d',
            borderTop: '1px solid #ddd',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            fontSize: '0.9rem',
        }}>
            <input
                type="range"
                className="form-range"
                min="0"
                max={totalPages - 1}
                value={currentIndex}
                onChange={(e) => onIndexChange(parseInt(e.target.value))}
                style={{
                    flex: 1,
                    accentColor: '#6e3b3b',
                    cursor: 'pointer',
                    border: 'none',
                    WebkitSliderThumb: {
                        background: '#6e3b3b'
                    }
                }}
            />

            <span style={{
                minWidth: '80px',
                textAlign: 'right',
                fontWeight: 'bold',
                color: theme === 'dark' ? '#fff' : '#6e3b3b'
            }}>
                {currentIndex + 1} / {totalPages}
            </span>
        </div>
    );
}