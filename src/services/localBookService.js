import librosData from "../data/libros.json";

export async function getBooksFromJSON(query = "", page = 1, pageSize = 10) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = query
        ? librosData.filter((libro) =>
            Object.values(libro)
              .join(" ")
              .toLowerCase()
              .includes(query.toLowerCase())
          )
        : librosData;

      const start = (page - 1) * pageSize;
      const end = start + pageSize;

      resolve({
        data: filtered.slice(start, end),
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / pageSize),
        page,
        pageSize,
      });
    }, 300);
  });
}
