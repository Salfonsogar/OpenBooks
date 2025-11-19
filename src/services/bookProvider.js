import { getBooksFromDataBase} from "./bookService.js";
import { getBooksFromJSON } from "./localBookService";
import { fetchBooks } from "./openLibraryService";
import { DEFAULT_SOURCE } from "../constants/api";

export async function getBooks(SOURCE, query = "", page = 1, pageSize = 10, autor = "", categorias = []) {
  if (!SOURCE) {
    SOURCE = DEFAULT_SOURCE;
  }
  switch (SOURCE) {
    case "json":
      return await getBooksFromJSON(query, page, pageSize);
    case "dataBase":
      return await getBooksFromDataBase(query, page, pageSize, autor, categorias);
    case "openLibrary":
      return await fetchBooks(query, page, pageSize);
    default:
      console.error("Fuente de datos no válida:", SOURCE);
      return { data: [], totalPages: 0, total: 0, page, pageSize };
  }
}
