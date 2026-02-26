// normalizeBook: normaliza distintos shapes de objetos 'libro' a claves comunes
export default function normalizeBook(libro = {}) {
  if (!libro) return null;

  // Normalizaciones comunes (acepta muchas variantes de nombres)
  const ArchivoBase64 =
    libro.ArchivoBase64 || libro.archivoBase64 || libro.archivo_base64 || libro.fileBase64 || libro.Archivo || null;

  const archivo = libro.url || libro.Url || libro.archivo || libro.fileUrl || libro.archivoUrl || null;

  const PortadaBase64 = libro.PortadaBase64 || libro.portadaBase64 || libro.portada_base64 || null;

  const portada = libro.PortadaUrl || libro.portadaUrl || libro.imagen || libro.imagenUrl || libro.portada || null;

  return {
    ...libro,
    ArchivoBase64,
    PortadaBase64,
    archivo,
    portada,
  };
}
