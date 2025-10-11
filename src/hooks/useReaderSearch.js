import { useState } from "react";

export default function useReaderSearch(book, rendition) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const totalMatches = searchResults.reduce(
    (acc, r) => acc + (r.matches ? r.matches.length : 0),
    0
  );

  const searchBook = async () => {
    if (!book || !searchTerm.trim()) return;
    const results = [];

    for (const item of book.spine.spineItems) {
      await item.load(book.load.bind(book));
      const found = item.find(searchTerm);
      if (found && found.length) {
        results.push({ href: item.href, matches: found });
      }
      item.unload();
    }

    setSearchResults(results);
  };

  const goToSearchResult = (cfi) => {
    if (rendition && typeof rendition.display === "function") {
      rendition.display(cfi);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    totalMatches,
    searchBook,
    goToSearchResult,
  };
}
