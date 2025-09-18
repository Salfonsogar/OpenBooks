import { useRef } from "react";

export default function SearchBar({ onSearch, history }) {
  const searchBarRef = useRef(null);

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
            if (history.length > 0) {
              document.getElementById("historial-busquedas").style.display =
                "block";
            }
          }}
          onBlur={() => {
            setTimeout(() => {
              document.getElementById("historial-busquedas").style.display =
                "none";
            }, 200);
          }}
        />
        <div
          id="historial-busquedas"
          className="list-group position-absolute w-100 shadow-sm"
          style={{ zIndex: 1000, display: "none" }}
        >
          {history
            .slice()
            .reverse()
            .map((q, i) => (
              <button
                key={i}
                type="button"
                className="list-group-item list-group-item-action"
                onClick={() => onSearch(q)}
              >
                {q}
              </button>
            ))}
        </div>
        <button className="btn btn-buscar" type="submit">
          Buscar
        </button>
      </div>
    </form>
  );
}
