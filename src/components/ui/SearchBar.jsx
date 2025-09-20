import { useRef, useState } from "react";

export default function SearchBar({ onSearch, history }) {
  const searchBarRef = useRef(null);
  const [showHistory, setShowHistory] = useState(false);

  // Normaliza history a array de forma segura
  const historyArray = (() => {
    if (Array.isArray(history)) return history;
    if (!history) return [];
    if (typeof history === "string") {
      try {
        const parsed = JSON.parse(history);
        return Array.isArray(parsed) ? parsed : [history];
      } catch {
        // si no es JSON, intenta separar por coma, si aplica
        return (
          history
            .split?.(",")
            .map((s) => s.trim())
            .filter(Boolean) || [history]
        );
      }
    }
    // si viene otro tipo (objeto/valor), lo envuelve en array
    return [history];
  })();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = searchBarRef.current.value.trim();
    if (value) onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3 position-relative">
        <input
          type="text"
          className="form-control input-busqueda"
          placeholder="Buscar por título, autor o categoría..."
          ref={searchBarRef}
          aria-label="Buscar libros"
          onFocus={() => {
            if (historyArray.length > 0) setShowHistory(true);
          }}
          onBlur={() => {
            // pequeño delay para permitir que onMouseDown del botón se ejecute
            setTimeout(() => setShowHistory(false), 150);
          }}
        />

        {showHistory && historyArray.length > 0 && (
          <div
            id="historial-busquedas"
            className="list-group position-absolute w-100 shadow-sm"
            style={{ zIndex: 1000 }}
          >
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

        <button className="btn btn-buscar" type="submit">
          Buscar
        </button>
      </div>
    </form>
  );
}
