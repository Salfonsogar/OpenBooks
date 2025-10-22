export default function usePortada(libro) {
  // acepta varios shapes: PortadaBase64 / portadaBase64 / PortadaUrl / imagen / portada
  if (!libro) return "/placeholder.png";

  const portadaBase64 = libro.PortadaBase64 || libro.portadaBase64 || libro.portada_base64 || libro.portadaBase64;
  if (portadaBase64) return `data:image/png;base64,${portadaBase64}`;

  const portadaUrl = libro.PortadaUrl || libro.portadaUrl || libro.imagen || libro.imagenUrl || libro.portada;
  if (portadaUrl) {
    try {
      return encodeURI(portadaUrl);
    } catch {
      return portadaUrl;
    }
  }

  return "/placeholder.png";
}
