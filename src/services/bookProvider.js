import { getBooksFromSupabase } from "./bookService";
import { getBooksFromJSON } from "./localBookService";

const SOURCE = "supabase"; 

export async function getBooks() {
  if (SOURCE === "json") {
    return await getBooksFromJSON();
  } else if (SOURCE === "supabase") {
    return await getBooksFromSupabase();
  } else {
    console.error("Fuente de datos no válida:", SOURCE);
    return [];
  }
}
