export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
      <button
        className="btn me-2 btn-paginacion"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        Anterior
      </button>
      <span className="align-self-center fw-bold text-paginacion">
        Página {page} de {totalPages}
      </span>
      <button
        className="btn ms-2 btn-paginacion"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
}
