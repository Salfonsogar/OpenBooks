export default function ReaderHighlightMenu({ position, onSelectColor, onClose }) {
    if (!position.show) return null;

    const colors = [
        { color: '#ffeb3b', name: 'Amarillo' },
        { color: '#a5d6a7', name: 'Verde' },
        { color: '#90caf9', name: 'Azul' },
        { color: '#ce93d8', name: 'Violeta' },
        { color: '#f48fb1', name: 'Rosa' }
    ];

    return (
        <>
            {/* Invisible backdrop to close menu when clicking outside */}
            <div
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1099 }}
                onClick={onClose}
            />

            <div
                className="highlight-menu shadow-sm"
                style={{
                    position: 'fixed',
                    top: position.y,
                    left: position.x,
                    transform: 'translate(-50%, -100%)',
                    backgroundColor: '#fff',
                    padding: '8px',
                    borderRadius: '50px',
                    display: 'flex',
                    gap: '8px',
                    zIndex: 1100,
                    marginTop: '-10px'
                }}
            >
                {colors.map((c) => (
                    <button
                        key={c.color}
                        onClick={() => onSelectColor(c.color)}
                        title={c.name}
                        style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: c.color,
                            border: '2px solid #fff',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                            cursor: 'pointer',
                            padding: 0,
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                ))}
            </div>
        </>
    );
}
