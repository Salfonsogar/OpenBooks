import { useState } from "react";
import useReaderProgress from "./useReaderProgress";
import useReaderBookmarks from "./useReaderBookmarks";
import useReaderSearch from "./useReaderSearch";
import useReaderHighlight from "./useReaderHighlight";

export default function useReader(fileUrl) {
  const [rendition, setRendition] = useState(null);
  const [book, setBook] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { location, loading, onLocationChanged } =
    useReaderProgress(fileUrl);
  const { bookmarks, addBookmark, goToBookmark } = useReaderBookmarks(
    fileUrl,
    location,
    rendition
  );
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    totalMatches,
    searchBook,
    goToSearchResult,
  } = useReaderSearch(book, rendition);

  const { highlights, clearHighlights, addHighlight } = useReaderHighlight(rendition, fileUrl);

  return {
    location,
    loading, 
    bookmarks,
    searchTerm,
    searchResults,
    totalMatches,
    isSidebarOpen,
    setIsSidebarOpen,
    setSearchTerm,
    setRendition,
    setBook,
    onLocationChanged,
    addBookmark,
    goToBookmark,
    searchBook,
    goToSearchResult,
    highlights,
    clearHighlights,
    addHighlight
  };
}
