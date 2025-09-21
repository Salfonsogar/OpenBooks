import { useState, useEffect } from "react";
import { ReactReader } from "react-reader";

export default function ReaderApp({ fileUrl, onClose }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /* console.log(
      "👀 ReaderApp montado, 📚 Iniciando carga del libro: ",
      fileUrl
    ); */
  }, [fileUrl]);

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      {loading && <p>Cargando libro...</p>}

      <ReactReader
        url={fileUrl}
        location={location}
        locationChanged={(epubcfi) => {
          /* console.log("✅ Página renderizada en:", epubcfi); */
          setLocation(epubcfi);
          setLoading(false);
        }}
        showToc={true}
      />

      <button
        onClick={() => {
          /* console.log("👋 Cerrando lector"); */
          onClose();
        }}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          padding: "8px 12px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Cerrar
      </button>
    </div>
  );
}
