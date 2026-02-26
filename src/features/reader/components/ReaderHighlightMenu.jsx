export default function ReaderHighlightMenu({ position, onSelectColor, onClose }) {
    if (!position.show) return null;

    const colors = [
        { color: '#fef08a', name: 'Amarillo' },
        { color: '#86efac', name: 'Verde' },
        { color: '#93c5fd', name: 'Azul' },
        { color: '#c4b5fd', name: 'Violeta' },
        { color: '#f9a8d4', name: 'Rosa' }
    ];

    return (
        <>
            {/* Invisible backdrop to close menu when clicking outside */}
            <div
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1099 }}
                onClick={onClose}
            />

            <div
                className="highlight-menu"
                style={{
                    position: 'fixed',
                    top: position.y,
                    left: position.x,
                    transform: 'translate(-50%, -100%)',
                    backgroundColor: '#1e293b',
                    padding: '8px 12px',
                    borderRadius: '50px',
                    display: 'flex',
                    gap: '8px',
                    zIndex: 1100,
                    marginTop: '-10px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}
            >
                {colors.map((c) => (
                    <button
                        type="button"
                        key={c.color}
                        onClick={() => onSelectColor(c.color)}
                        title={c.name}
                        className="color-swatch"
                        style={{
                            backgroundColor: c.color,
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            border: '3px solid #fff',
                            cursor: 'pointer',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                            transition: 'transform 0.2s'
                        }}
                    />
                ))}
            </div>
        </>
    );
}
