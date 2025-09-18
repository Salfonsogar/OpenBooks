import Features from "../components/ui/Features";
import { Link } from "react-router-dom";

export default function Home() {
  const featureItems = [
    {
      title: "🔍 Buscar Libros",
      text: "Encuentra tus libros favoritos con filtros por autor, género o palabra clave.",
      to: "/catalog",
      buttonText: "Explorar",
    },
    {
      title: "📚 Publicar Libros",
      text: "Comparte tus propios libros con la comunidad y gestiona tus publicaciones.",
      to: "/profile",
      buttonText: "Publicar",
    },
    {
      title: "📖 Leer Online",
      text: "Accede a libros digitales desde cualquier dispositivo, en cualquier momento.",
      to: "/library",
      buttonText: "Leer Ahora",
    },
  ];

  return (
    <>
      <main className="container my-5">
        <section className="text-center mb-5">
          <h1 className="display-5 fw-bold text-main">
            Bienvenido a la Biblioteca Virtual
          </h1>
          <p className="lead text-secondary">
            Explora, publica y disfruta de miles de libros desde cualquier
            lugar.
          </p>
          <Link
            to="/Catalog"
            className="btn btn-lg btn-main text-decoration-none"
          >
            Ver Catálogo
          </Link>
        </section>
        <div className="container mt-5">
          <Features items={featureItems} />
        </div>
      </main>
    </>
  );
}
