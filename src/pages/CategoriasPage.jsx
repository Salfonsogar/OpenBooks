import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCategories,
    selectAllCategories,
    selectCategoriesStatus,
    addCategory,
    updateCategory,
    deleteCategory
} from "../store/categoriesSlice";
import "../styles/CategoriasPage.css";
export default function CategoriasPage() {
    const dispatch = useDispatch();
    const categories = useSelector(selectAllCategories);
    const status = useSelector(selectCategoriesStatus);
    const loading = status === 'loading';

    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        nombre: ""
    });

    useEffect(() => {
        dispatch(fetchCategories({ pageNumber: 1, pageSize: 100 }));
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const openModal = (category = null) => {
        if (category) {
            setEditingCategory(category);
            setFormData({
                nombre: category.nombre || category.Nombre || ""
            });
        } else {
            setEditingCategory(null);
            setFormData({
                nombre: ""
            });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await dispatch(updateCategory({ id: editingCategory.id || editingCategory.Id, categoryData: formData })).unwrap();
            } else {
                await dispatch(addCategory(formData)).unwrap();
            }
            setShowModal(false);
            dispatch(fetchCategories({ pageNumber: 1, pageSize: 100 }));
        } catch (error) {
            alert("Error al guardar la categoría: " + error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
            try {
                await dispatch(deleteCategory(id)).unwrap();
                dispatch(fetchCategories({ pageNumber: 1, pageSize: 100 }));
            } catch (error) {
                alert("Error al eliminar la categoría: " + error);
            }
        }
    };

    return (
        <>
            <div className="container" style={{ maxWidth: '1200px' }}>
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h1 className="display-5 fw-bold mb-2" style={{ color: '#6366F1' }}>Gestión de Categorías</h1>
                        <p className="text-muted">Administra las categorías de libros de la biblioteca</p>
                    </div>
                    <button className="btn btn-main btn-lg" onClick={() => openModal()}>
                        <i className="fas fa-plus me-2"></i>
                        Nueva Categoría
                    </button>
                </div>

                <div className="card shadow-sm p-4">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0 align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Nombre</th>
                                    <th className="text-end">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="2" className="text-center py-4">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Cargando...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : categories.length === 0 ? (
                                    <tr>
                                        <td colSpan="2" className="text-center py-4 text-muted">
                                            No hay categorías registradas
                                        </td>
                                    </tr>
                                ) : (
                                    categories.map((category) => {
                                        const id = category.id || category.Id;
                                        const nombre = category.nombre || category.Nombre;

                                        return (
                                            <tr key={id}>
                                                <td className="fw-bold">{nombre}</td>
                                                <td className="text-end">
                                                    <button
                                                        className="btn btn-sm btn-outline-primary me-2"
                                                        onClick={() => openModal(category)}
                                                    >
                                                        <i class="fas fa-edit icono"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDelete(id)}
                                                    >
                                                        <i class="fas fa-trash icono"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
                                </h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn " onClick={() => setShowModal(false)}>
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn ">
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
