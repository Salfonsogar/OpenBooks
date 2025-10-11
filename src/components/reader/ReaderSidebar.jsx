import ReaderBookmarks from "./ReaderBookmarks";
import ReaderSearch from "./ReaderSearch";

export default function ReaderSidebar({
  isOpen,
  bookmarks,
  searchTerm,
  searchResults,
  totalMatches,
  onAddBookmark,
  onGoToBookmark,
  onSearch,
  onChangeSearch,
  onGoToSearchResult,
  onClose,
}) {
  return (
    <aside className={`reader-sidebar ${isOpen ? "open" : ""}`}>
      <ReaderBookmarks
        bookmarks={bookmarks}
        onAddBookmark={onAddBookmark}
        onGoToBookmark={onGoToBookmark}
      />

      <hr />

      <ReaderSearch
        searchTerm={searchTerm}
        searchResults={searchResults}
        totalMatches={totalMatches}
        onSearch={onSearch}
        onChangeSearch={onChangeSearch}
        onGoToSearchResult={onGoToSearchResult}
      />

      <hr />

      <button onClick={onClose} className="btn-close-reader">
        Cerrar
      </button>
    </aside>
  );
}
