import { useLocalStorage } from "./useLocalStorage";

export function useBookshelf() {
  const [estanteria, setEstanteria] = useLocalStorage("estanteria", []);

  const handleAddBook = (libro) => {
    if (
      !estanteria.some(
        (l) => l.titulo === libro.titulo && l.autor === libro.autor
      )
    ) {
      setEstanteria([...estanteria, libro]);
      return { success: true, message: "Libro agregado a la estantería 📚" };
    }
    return { success: false, message: "Ese libro ya está en tu estantería ⚠️" };
  };

  const handleRemoveBook = (libro) => {
    const updated = estanteria.filter(
      (l) => !(l.titulo === libro.titulo && l.autor === libro.autor)
    );
    setEstanteria(updated);
    return { success: true, message: "Libro eliminado de la estantería 🗑️" };
  };

  return { estanteria, handleAddBook, handleRemoveBook };
}
