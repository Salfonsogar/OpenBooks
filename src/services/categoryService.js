export async function getCategories(pageNumber = 1, pageSize = 50) {
  try {
    const url = new URL("https://localhost:7080/api/Categorias");
    url.searchParams.append("pageNumber", pageNumber);
    url.searchParams.append("pageSize", pageSize);
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error("Error al obtener categorías");
    const data = await response.json();
    return data.results || [];
  } catch (e) {
    console.error("Error al obtener categorías:", e);
    return [];
  }
}
