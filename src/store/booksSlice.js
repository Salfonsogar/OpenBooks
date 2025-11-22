import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
async function getBooksFromDataBase(query = "", page = 1, pageSize = 10, autor = "", categorias = []) {
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

export const fetchBookById = createAsyncThunk(
    'books/fetchBookById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://localhost:7080/api/Libros/${id}`);
            if (!response.ok) {
                throw new Error('Error fetching book');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCatalogBooks = createAsyncThunk(
    'books/fetchCatalogBooks',
    async ({ query, page, pageSize, autor, categorias }, { rejectWithValue }) => {
        try {
            // Using getBooksFromDataBase directly as it was the default source
            const response = await getBooksFromDataBase(query, page, pageSize, autor, categorias);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchTopViewedBooks = createAsyncThunk(
    'books/fetchTopViewedBooks',
    async (_, { rejectWithValue }) => {
        try {
            // Simulating top viewed with page 1
            const response = await getBooksFromDataBase("", 1, 10, "", []);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchReports = createAsyncThunk(
    'books/fetchReports',
    async (_, { rejectWithValue }) => {
        try {
            // Simulating reports with page 2 (formerly top downloaded)
            const response = await getBooksFromDataBase("", 2, 10, "", []);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchTopRatedBooks = createAsyncThunk(
    'books/fetchTopRatedBooks',
    async (_, { rejectWithValue }) => {
        try {
            // Simulating top rated with page 3
            const response = await getBooksFromDataBase("", 3, 10, "", []);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addBook = createAsyncThunk(
    'books/addBook',
    async (bookData, { rejectWithValue }) => {
        try {
            const response = await fetch("https://localhost:7080/api/Libros", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
            });
            if (!response.ok) throw new Error('Error creating book');
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateBook = createAsyncThunk(
    'books/updateBook',
    async ({ id, bookData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://localhost:7080/api/Libros/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
            });
            if (!response.ok) throw new Error('Error updating book');
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteBook = createAsyncThunk(
    'books/deleteBook',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://localhost:7080/api/Libros/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Error deleting book');
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        currentBook: null,
        catalog: {
            items: [],
            totalPages: 1,
            status: 'idle',
            error: null,
        },
        topViewed: {
            items: [],
            status: 'idle',
            error: null,
        },
        reports: {
            items: [],
            status: 'idle',
            error: null,
        },
        topRated: {
            items: [],
            status: 'idle',
            error: null,
        },
        status: 'idle', // For currentBook
        error: null,    // For currentBook
    },
    reducers: {
        clearCurrentBook: (state) => {
            state.currentBook = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchBookById
            .addCase(fetchBookById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBookById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentBook = action.payload;
            })
            .addCase(fetchBookById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // fetchCatalogBooks
            .addCase(fetchCatalogBooks.pending, (state) => {
                state.catalog.status = 'loading';
            })
            .addCase(fetchCatalogBooks.fulfilled, (state, action) => {
                state.catalog.status = 'succeeded';
                state.catalog.items = action.payload.data;
                state.catalog.totalPages = action.payload.totalPages;
            })
            .addCase(fetchCatalogBooks.rejected, (state, action) => {
                state.catalog.status = 'failed';
                state.catalog.error = action.payload;
            })
            // fetchTopViewedBooks
            .addCase(fetchTopViewedBooks.pending, (state) => {
                state.topViewed.status = 'loading';
            })
            .addCase(fetchTopViewedBooks.fulfilled, (state, action) => {
                state.topViewed.status = 'succeeded';
                state.topViewed.items = action.payload;
            })
            .addCase(fetchTopViewedBooks.rejected, (state, action) => {
                state.topViewed.status = 'failed';
                state.topViewed.error = action.payload;
            })
            // fetchReports
            .addCase(fetchReports.pending, (state) => {
                state.reports.status = 'loading';
            })
            .addCase(fetchReports.fulfilled, (state, action) => {
                state.reports.status = 'succeeded';
                state.reports.items = action.payload;
            })
            .addCase(fetchReports.rejected, (state, action) => {
                state.reports.status = 'failed';
                state.reports.error = action.payload;
            })
            // fetchTopRatedBooks
            .addCase(fetchTopRatedBooks.pending, (state) => {
                state.topRated.status = 'loading';
            })
            .addCase(fetchTopRatedBooks.fulfilled, (state, action) => {
                state.topRated.status = 'succeeded';
                state.topRated.items = action.payload;
            })
            .addCase(fetchTopRatedBooks.rejected, (state, action) => {
                state.topRated.status = 'failed';
                state.topRated.error = action.payload;
            })
            // addBook
            .addCase(addBook.fulfilled, (state, action) => {
                state.catalog.items.push(action.payload);
            })
            // updateBook
            .addCase(updateBook.fulfilled, (state, action) => {
                const index = state.catalog.items.findIndex(book => book.id === action.payload.id);
                if (index !== -1) {
                    state.catalog.items[index] = action.payload;
                }
            })
            // deleteBook
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.catalog.items = state.catalog.items.filter(book => book.id !== action.payload);
            });
    },
});

export const { clearCurrentBook } = booksSlice.actions;
export default booksSlice.reducer;

export const selectCurrentBook = (state) => state.books.currentBook;
export const selectBookStatus = (state) => state.books.status;
export const selectBookError = (state) => state.books.error;

export const selectCatalogBooks = (state) => state.books.catalog.items;
export const selectCatalogTotalPages = (state) => state.books.catalog.totalPages;
export const selectCatalogStatus = (state) => state.books.catalog.status;

export const selectTopViewedBooks = (state) => state.books.topViewed.items;
export const selectReports = (state) => state.books.reports.items;
export const selectTopRatedBooks = (state) => state.books.topRated.items;
