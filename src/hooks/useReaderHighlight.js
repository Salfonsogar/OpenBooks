import { useState, useEffect, useCallback } from "react";

export default function useReaderHighlight(rendition, fileUrl) {
  const [highlights, setHighlights] = useState([]);
  const storageKey = `highlights_${fileUrl}`;

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
  }, [fileUrl, storageKey]);

  const renderHighlight = useCallback(
    (cfiRange) => {
      if (!rendition) return;
      try {
        rendition.annotations.add("highlight", cfiRange, {}, null, "hl", {
          fill: "yellow",
          "fill-opacity": "0.4",
          "mix-blend-mode": "multiply",
        });
      } catch (e) {
        console.warn("Error aplicando highlight:", e);
      }
    },
    [rendition]
  );

  const addHighlight = useCallback(
    (cfiRange) => {
      setHighlights((prev) => {
        const updated = [...prev, cfiRange];
        localStorage.setItem(storageKey, JSON.stringify(updated));
        return updated;
      });
      renderHighlight(cfiRange);
    },
    [storageKey, renderHighlight]
  );

  const clearHighlights = useCallback(() => {
    setHighlights([]);
    localStorage.removeItem(storageKey);
    if (rendition) rendition.annotations.removeAll("highlight");
  }, [rendition, storageKey]);

  useEffect(() => {
    if (!rendition) return;
    highlights.forEach(renderHighlight);
  }, [rendition, highlights, renderHighlight]);

  useEffect(() => {
  if (!rendition) return;

  const handleSelected = (cfiRange, contents) => {
    try {
      const selectedText = contents.window.getSelection().toString().trim();
      if (!cfiRange || !selectedText || selectedText.length === 0) return;

      renderHighlight(cfiRange);
      addHighlight(cfiRange);
      contents.window.getSelection().removeAllRanges();
    } catch (e) {
      console.warn("Error al resaltar:", e);
    }
  };

  rendition.on("selected", handleSelected);
  return () => rendition.off("selected", handleSelected);
}, [rendition, addHighlight, renderHighlight]);


  return { highlights, addHighlight, clearHighlights };
}
