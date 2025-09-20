import {
  OPEN_LIBRARY_API,
  OPEN_LIBRARY_COVERS,
  PLACEHOLDER_IMG,
} from "../constants/api";

function mapBook(doc) {
  return {
    titulo: doc.title || "Sin título",
    autor: doc.author_name ? doc.author_name.join(", ") : "Autor desconocido",
    categoria: doc.subject ? doc.subject[0] : "General",
    imagen: doc.cover_i
      ? `${OPEN_LIBRARY_COVERS}/${doc.cover_i}-M.jpg`
      : PLACEHOLDER_IMG,
  };
}

export async function fetchBooks(query, page, pageSize) {
  const url = `${OPEN_LIBRARY_API}/search.json?q=${encodeURIComponent(
    query
  )}&page=${page}&limit=${pageSize}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
  const data = await res.json();

  return {
    totalPages: Math.ceil(data.numFound / pageSize),
    books: data.docs.map(mapBook),
  };
}
