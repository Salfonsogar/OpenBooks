import { useLocalStorageValue } from "./useLocalStorage";
import { updateLocalStorage } from "../utils/updateLocalStorage";

export function useBookshelf() {
  const estanteria = useLocalStorageValue("estanteria", []);

  const handleAddBook = (libro) => {
    if (
      !estanteria.some(
        (l) => l.titulo === libro.titulo && l.autor === libro.autor
      )
    ) {
      updateLocalStorage("estanteria", [...estanteria, libro]);
      return { success: true, message: "Libro agregado a la estantería 📚" };
    }
    return { success: false, message: "Ese libro ya está en tu estantería ⚠️" };
  };

  const handleRemoveBook = (libro) => {
    const updated = estanteria.filter(
      (l) => !(l.titulo === libro.titulo && l.autor === libro.autor)
    );
    updateLocalStorage("estanteria", updated);
    return { success: true, message: "Libro eliminado de la estantería 🗑️" };
  };

  return { estanteria, handleAddBook, handleRemoveBook };
}
