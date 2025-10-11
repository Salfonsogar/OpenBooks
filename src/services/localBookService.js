import librosData from "../data/libros.json";

export async function getBooksFromJSON() {
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(librosData);
    }, 300);
  });
}
