export async function getBooksFromDataBase(query = "", page = 1, pageSize = 10, autor = "", categorias = []) {
  try {
    const baseUrl = "https://localhost:7080/api/Libros";

    const url = new URL(baseUrl);
    if (query) url.searchParams.append("query", query);
    url.searchParams.append("page", page);
    url.searchParams.append("pageSize", pageSize);
    if (autor) url.searchParams.append("autor", autor);
    if (categorias && categorias.length > 0) {
      categorias.forEach(cat => url.searchParams.append("categorias", cat));
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const result = await response.json();

    return {
      data: result.data,
      total: result.total,
      totalPages: result.totalPages,
      page: result.page,
      pageSize: result.pageSize,
    };
  } catch (error) {
    console.error("Error al obtener los libros:", error);
    return {
      data: [],
      total: 0,
      totalPages: 0,
      page,
      pageSize,
    };
  }
}
