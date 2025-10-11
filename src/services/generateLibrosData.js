// generateLibrosData.js
import fs from "fs";
import path from "path";

// Rutas base
const librosDir = path.resolve("public/libros");
const portadasDir = path.resolve("public/portadas");
const outputFile = path.resolve("src/data/libros.json");

// Función utilitaria para limpiar nombres
function limpiarTitulo(nombre) {
  const base = nombre.replace(/\.[^/.]+$/, ""); // quita extensión
  return base
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase()) // mayúsculas iniciales
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // quita tildes para coincidencia
}

// Mapeo de autores conocidos (opcional, puedes ampliarlo)
const autoresPorTitulo = {
  "asi hablo zaratustra": "Friedrich Nietzsche",
  "el extranjero": "Albert Camus",
  "el tunel": "Ernesto Sabato",
  "la metamorfosis": "Franz Kafka",
  "la senda del perdedor": "Charles Bukowski",
  "la tregua": "Mario Benedetti",
  "la vida breve": "Juan Carlos Onetti",
  "noches blancas": "Fiódor Dostoyevski",
};

function obtenerAutor(nombreLimpio) {
  const clave = nombreLimpio.toLowerCase();
  return autoresPorTitulo[clave] || "Autor desconocido";
}

function generarLibrosJSON() {
  const libros = fs.readdirSync(librosDir).filter((f) => f.endsWith(".epub"));

  const data = libros.map((archivo) => {
    const nombreSinExt = archivo.replace(".epub", "");
    const tituloLimpio = limpiarTitulo(nombreSinExt);
    const autor = obtenerAutor(tituloLimpio);

    // Buscar portada con el mismo nombre (distinta extensión)
    const portada = fs
      .readdirSync(portadasDir)
      .find((p) => p.toLowerCase().startsWith(nombreSinExt.toLowerCase()));

    return {
      titulo: tituloLimpio,
      autor,
      imagen: portada ? `/portadas/${portada}` : null,
      url: `/libros/${archivo}`,
    };
  });

  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2), "utf-8");
  console.log(`✅ Archivo generado: ${outputFile}`);
}

// Ejecutar
generarLibrosJSON();
