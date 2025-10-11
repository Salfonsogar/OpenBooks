import { supabase } from "../supabaseClient.js";

export async function getBooksFromSupabase() {
  const { data, error } = await supabase.from("books").select("*");
  if (error) {
    console.error("Error al obtener libros de Supabase:", error.message);
    return [];
  }

  return data.map((libro) => ({
    titulo: libro.title,
    autor: libro.author,
    genero: libro.genre,
    anio: libro.year,
    imagen: libro.cover_url,
    url: libro.file_url,
  }));
}
