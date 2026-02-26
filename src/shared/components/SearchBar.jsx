import { useRef, useState } from 'react';

export default function SearchBar({ onSearch, history }) {
  const searchBarRef = useRef(null);
  const containerRef = useRef(null); // Nueva ref para el contenedor
  const [showHistory, setShowHistory] = useState(false);

  // Normaliza history a array de forma segura
  const historyArray = (() => {
    if (Array.isArray(history)) return history;
    if (!history) return [];
    if (typeof history === 'string') {
      try {
        const parsed = JSON.parse(history);
        return Array.isArray(parsed) ? parsed : [history];
      } catch {
        return (
          history
            .split?.(',')
            .map((s) => s.trim())
            .filter(Boolean) || [history]
        );
      }
    }
    return [history];
  })();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = searchBarRef.current.value.trim();
    if (value) onSearch(value);
  };

  return (
    <div className="search-wrapper mb-4" ref={containerRef}>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="input-busqueda"
            placeholder="Buscar por título, autor o categoría..."
            ref={searchBarRef}
            aria-label="Buscar libros"
            onFocus={() => {
              if (historyArray.length > 0) setShowHistory(true);
            }}
            onBlur={() => {
              setTimeout(() => setShowHistory(false), 150);
            }}
          />
          <button className="btn btn-buscar" type="submit">
            Buscar
          </button>
        </div>

        {showHistory && historyArray.length > 0 && (
          <div id="historial-busquedas" className="list-group">
            {historyArray
              .slice()
              .reverse()
              .map((q, i) => (
                <button
                  key={i}
                  type="button"
                  className="list-group-item list-group-item-action"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onSearch(q);
                  }}
                >
                  {q}
                </button>
              ))}
          </div>
        )}
      </form>
    </div>
  );
}
