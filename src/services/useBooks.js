import { useEffect, useState } from "react";

export function useBooks(query, page, pageSize) {
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const loadBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(
            query
          )}&page=${page}&limit=${pageSize}`
        );
        const data = await res.json();

        setTotalPages(Math.ceil(data.numFound / pageSize));

        const libros = data.docs.map((doc) => ({
          titulo: doc.title || "Sin título",
          autor: doc.author_name
            ? doc.author_name.join(", ")
            : "Autor desconocido",
          categoria: doc.subject ? doc.subject[0] : "General",
          imagen: doc.cover_i
            ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
            : "https://via.placeholder.com/150x200?text=No+Imagen",
        }));

        setBooks(libros);
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
