import { useState } from "react";
import { ReactReader } from "react-reader";

export default function ReaderApp({ fileUrl, onClose }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      {loading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      <ReactReader
        url={fileUrl}
        location={location}
        locationChanged={(epubcfi) => {
          setLocation(epubcfi);
          setLoading(false);
        }}
        showToc={true}
      />

      <button
        onClick={() => {
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
