import { useState, useEffect } from "react";

export default function useBookFromBase64(base64OrUrl, type = "application/epub+zip") {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!base64OrUrl) {
      setUrl(null);
      return;
    }

    // Caso 1: ya es URL válida (http, /, blob:, data:)
    if (
      typeof base64OrUrl === "string" &&
      (base64OrUrl.startsWith("http") ||
        base64OrUrl.startsWith("/") ||
        base64OrUrl.startsWith("blob:") ||
        base64OrUrl.startsWith("data:"))
    ) {
      setUrl(base64OrUrl);
      return;
    }

    // Caso 2: asumimos que es base64 -> convertir a ArrayBuffer y enviarlo al Service Worker
    try {
      console.log('[useBookFromBase64] procesando base64 a ArrayBuffer... (preview):', typeof base64OrUrl === 'string' ? base64OrUrl.slice(0,80) : base64OrUrl);
      const byteCharacters = atob(base64OrUrl);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      // Intentar usar service worker para exponer la ruta /local-epubs/<id>.epub
      const id = `local-${Date.now()}.epub`;
      const path = `/local-epubs/${id}`;

      if (navigator && navigator.serviceWorker && navigator.serviceWorker.controller) {
        try {
          navigator.serviceWorker.controller.postMessage({ type: 'STORE_EPUB', id, arrayBuffer: byteArray.buffer, mime: type }, [byteArray.buffer]);
          console.log('[useBookFromBase64] enviado ArrayBuffer al SW, usando path:', path);
          setUrl(path);

          return () => {
            try {
              navigator.serviceWorker.controller.postMessage({ type: 'UNSTORE_EPUB', id });
              console.log('[useBookFromBase64] pedido UNSTORE_EPUB para id:', id);
            } catch (err) {
              console.warn('[useBookFromBase64] error enviando UNSTORE_EPUB:', err);
            }
          };
        } catch {
          console.warn('[useBookFromBase64] no se pudo enviar al SW, fallback a objectURL');
        }
      }

      // Fallback: crear objectURL local (si SW no está disponible)
      const blob = new Blob([byteArray], { type });
      const objectUrl = URL.createObjectURL(blob);
      console.log('[useBookFromBase64] SW no disponible -> creado objectURL para Blob:', objectUrl);
      setUrl(objectUrl);

      return () => {
        try {
          console.log('[useBookFromBase64] revocando objectURL (fallback):', objectUrl);
          URL.revokeObjectURL(objectUrl);
        } catch {
          console.warn('[useBookFromBase64] error revocando objectURL fallback');
        }
      };
    } catch (err) {
      console.error("useBookFromBase64: error procesando Base64 ->", err);
      setUrl(null);
    }
  }, [base64OrUrl, type]);

  return url;
}
