export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50 text-gray-800">
      <h1 className="text-5xl font-bold mb-3">404 Not Found</h1>
      <p className="text-lg mb-2"> Oops! Página no encontrada </p>
      <p className="text-gray-500 mb-6">
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>
      <a
        href="/"
        className="px-6 py-2 bg-blue-600  rounded-full hover:bg-blue-700 transition"
      >
        Volver al inicio
      </a>
    </div>
  );
}
