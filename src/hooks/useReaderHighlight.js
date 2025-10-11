import { useState, useEffect, useCallback } from "react";

export default function useReaderHighlight(rendition, fileUrl) {
  const [highlights, setHighlights] = useState([]);

  // 🔑 Genera una clave única por libro
  const storageKey = `highlights_${fileUrl}`;

  // 🧩 Cargar los highlights guardados del libro actual
  useEffect(() => {
    if (!fileUrl) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setHighlights(JSON.parse(saved));
      } catch {
        console.warn("Error al leer highlights del almacenamiento");
      }
    }
  }, [fileUrl]);

  // ✨ Agregar un nuevo highlight
  const addHighlight = useCallback(
    (cfiRange) => {
      setHighlights((prev) => {
        const updated = [...prev, cfiRange];
        localStorage.setItem(storageKey, JSON.stringify(updated));
        return updated;
      });
    },
    [storageKey]
  );

  // 🧹 Limpiar todos los highlights del libro actual
  const clearHighlights = useCallback(() => {
    setHighlights([]);
    localStorage.removeItem(storageKey);
    if (rendition) rendition.annotations.removeAll("highlight");
  }, [rendition, storageKey]);

  // 🖌️ Aplicar los highlights guardados al cargar el libro
  useEffect(() => {
    if (!rendition) return;

    highlights.forEach((cfiRange) => {
      try {
        rendition.annotations.add("highlight", cfiRange, {}, null, "hl", {
          fill: "yellow",
          "fill-opacity": "0.4",
          "mix-blend-mode": "multiply",
        });
      } catch (e) {
        console.warn("Error aplicando highlight:", e);
      }
    });
  }, [rendition, highlights]);

  // 🎯 Escuchar selección de texto del usuario
  useEffect(() => {
    if (!rendition) return;

    const handleSelected = (cfiRange, contents) => {
      try {
        rendition.annotations.add("highlight", cfiRange, {}, null, "hl", {
          fill: "yellow",
          "fill-opacity": "0.4",
          "mix-blend-mode": "multiply",
        });
        addHighlight(cfiRange);
        contents.window.getSelection().removeAllRanges();
      } catch (e) {
        console.warn("Error al resaltar:", e);
      }
    };

    rendition.on("selected", handleSelected);
    return () => rendition.off("selected", handleSelected);
  }, [rendition, addHighlight]);

  return { highlights, addHighlight, clearHighlights };
}
