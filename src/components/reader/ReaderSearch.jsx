export default function ReaderSearch({
  searchTerm,
  searchResults,
  totalMatches,
  onSearch,
  onChangeSearch,
  onGoToSearchResult,
}) {
  return (
    <section>
      <h5>Buscar</h5>
      <div className="search-box">
        <input
          type="text"
          className="input-search"
          placeholder="Buscar texto..."
          value={searchTerm}
          onChange={(e) => onChangeSearch(e.target.value)}
        />
        <button className="btn-search" onClick={onSearch}>
          Buscar
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          <p>
            Resultados: <b>{totalMatches}</b>
          </p>
          {searchResults.map((res, i) =>
            res.matches.map((match, j) => (
              <button
                key={`${i}-${j}`}
                className="btn-search-result"
                onClick={() => onGoToSearchResult(match.cfi)}
              >
                {match.excerpt?.length > 80
                  ? match.excerpt.slice(0, 80) + "..."
                  : match.excerpt || "Coincidencia"}
              </button>
            ))
          )}
        </div>
      )}
    </section>
  );
}
