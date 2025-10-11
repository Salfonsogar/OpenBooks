import { useState, useEffect, useCallback } from "react";

export default function useReaderHighlight(rendition) {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("highlights");
    if (saved) setHighlights(JSON.parse(saved));
  }, []);

  const addHighlight = useCallback(
    (cfiRange) => {
      setHighlights((prev) => {
        const updated = [...prev, cfiRange];
        localStorage.setItem("highlights", JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  const clearHighlights = useCallback(() => {
    setHighlights([]);
    localStorage.removeItem("highlights");
    if (rendition) rendition.annotations.removeAll("highlight");
  }, [rendition]);

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
