import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCatalogBooks,
    fetchTopViewedBooks,
    fetchTopRatedBooks,
    selectCatalogBooks,
    selectCatalogTotalPages,
    selectCatalogStatus,
    selectTopViewedBooks,
    selectTopRatedBooks
} from '../store/booksSlice';
import { fetchCategories, selectAllCategories } from '../store/categoriesSlice';
import { useLocalStorageValue } from './useLocalStorage';
import { updateLocalStorage } from '../utils/updateLocalStorage';

export const useCatalog = () => {
    const dispatch = useDispatch();

    // State
    const [query, setQuery] = useState("");
    const [autor, setAutor] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [page, setPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const pageSize = 20;

    // Redux Selectors
    const books = useSelector(selectCatalogBooks);
    const totalPages = useSelector(selectCatalogTotalPages);
    const status = useSelector(selectCatalogStatus);
    const loading = status === 'loading';
    const allCategorias = useSelector(selectAllCategories);
    const topViewed = useSelector(selectTopViewedBooks);
    const topRated = useSelector(selectTopRatedBooks);

    // History
    const history = useLocalStorageValue("historial", []);

    // Initial Fetch
    useEffect(() => {
        dispatch(fetchCategories({ pageNumber: 1, pageSize: 50 }));
        dispatch(fetchTopViewedBooks());
        dispatch(fetchTopRatedBooks());
    }, [dispatch]);

    // Catalog Fetch
    useEffect(() => {
        dispatch(fetchCatalogBooks({ query, page, pageSize, autor, categorias }));
    }, [dispatch, query, autor, categorias, page]);

    // Handlers
    const handleSearch = useCallback((newQuery) => {
        setQuery(newQuery);
        setPage(1);

        const normalized = newQuery.trim().toLowerCase();
        const normalizedHistory = Array.isArray(history) ? history : [];

        if (newQuery && !normalizedHistory.map((h) => h.toLowerCase()).includes(normalized)) {
            updateLocalStorage(
                "historial",
                [...normalizedHistory, newQuery].slice(-5)
            );
        }
    }, [history]);

    const handleAutorChange = (e) => {
        setAutor(e.target.value);
        setPage(1);
    };

    const handleCategoriaToggle = (categoryName) => {
        setCategorias(prev => {
            if (prev.includes(categoryName)) {
                return prev.filter(c => c !== categoryName);
            } else {
                return [...prev, categoryName];
            }
        });
        setPage(1);
    };

    const clearFilters = () => {
        setAutor("");
        setCategorias([]);
        setPage(1);
    };

    const activeFiltersCount = (autor ? 1 : 0) + categorias.length;

    return {
        query,
        setQuery,
        autor,
        setAutor,
        categorias,
        setCategorias,
        page,
        setPage,
        showFilters,
        setShowFilters,
        books,
        totalPages,
        loading,
        allCategorias,
        topViewed,
        topRated,
        history,
        handleSearch,
        handleAutorChange,
        handleCategoriaToggle,
        clearFilters,
        activeFiltersCount
    };
};
