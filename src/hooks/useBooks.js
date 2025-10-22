import { useEffect, useState } from "react";
import { fetchBooks } from "../services/bookProvider";

export function useBooks(query, page, pageSize) {
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!query) return;

    const loadBooks = async () => {
      setLoading(true);

      try {
        const { books, totalPages } = await fetchBooks(query, page, pageSize);
        setBooks(books);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error cargando libros:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadBooks();
  }, [query, page, pageSize]);

  return { books, totalPages, loading };
}
