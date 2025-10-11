import "../assets/styles/ReaderApp.css";
import useReader from "../hooks/useReader";
import ReaderSidebar from "../components/reader/ReaderSidebar";
import ReaderMain from "../components/reader/ReaderMain";

export default function ReaderApp({ fileUrl, onClose }) {
  const {
    location,
    bookmarks,
    searchTerm,
    searchResults,
    totalMatches,
    isSidebarOpen,
    setIsSidebarOpen,
    setSearchTerm,
    setRendition,
    searchBook,
    onLocationChanged,
    addBookmark,
    goToBookmark,
    goToSearchResult,
  } = useReader(fileUrl);

  return (
    <div className="reader-wrapper">
      <button
        className="btn btn-outline-secondary btn-toggle-sidebar"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        <i className="bi bi-list"></i>
      </button>

      <ReaderMain
        fileUrl={fileUrl}
        location={location}
        onLocationChanged={onLocationChanged}
        getRendition={(rend)=>{
          setRendition(rend);
        }}
      />

      <ReaderSidebar
        isOpen={isSidebarOpen}
        bookmarks={bookmarks}
        searchTerm={searchTerm}
        searchResults={searchResults}
        totalMatches={totalMatches}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onAddBookmark={addBookmark}
        onGoToBookmark={goToBookmark}
        onSearch={searchBook}
        onChangeSearch={setSearchTerm}
        onGoToSearchResult={goToSearchResult}
        onClose={onClose}
      />
    </div>
  );
}
