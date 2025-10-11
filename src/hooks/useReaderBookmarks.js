import { useState, useEffect } from "react";

export default function useReaderBookmarks(fileUrl, location, rendition) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`marks-${fileUrl}`)) || [];
    setBookmarks(saved);
  }, [fileUrl]);

  const addBookmark = () => {
    if (!location) return;
    const updated = [...bookmarks, location];
    setBookmarks(updated);
    localStorage.setItem(`marks-${fileUrl}`, JSON.stringify(updated));
  };

  const goToBookmark = (cfi) => {
    if (rendition && typeof rendition.display === "function") {
      rendition.display(cfi);
    }
  };

  return { bookmarks, addBookmark, goToBookmark };
}
