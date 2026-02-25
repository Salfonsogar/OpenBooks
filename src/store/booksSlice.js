import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
async function getBooksFromDataBase(query = "", page = 1, pageSize = 10, autor = "", categorias = [], token = null) {
    try {
        const baseUrl = "https://localhost:7080/api/Libros";

        const url = new URL(baseUrl);

        if (query && query.trim()) url.searchParams.append("query", query.trim());
        url.searchParams.append("page", page);
        url.searchParams.append("pageSize", pageSize);
        if (autor && autor.trim()) url.searchParams.append("autor", autor.trim());
        if (categorias && categorias.length > 0) {
            categorias.forEach(cat => url.searchParams.append("categorias", cat));
        }

        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url.toString(), { headers });
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

export const fetchBookDetail = createAsyncThunk(
    'books/fetchBookDetail',
    async (id, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;
            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            console.log('[fetchBookDetail] Fetching book:', id, 'token:', token ? 'yes' : 'no');

            const response = await fetch(`https://localhost:7080/api/Libros/${id}/detalle`, { headers });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('[fetchBookDetail] Error response:', response.status, errorData);
                throw new Error(errorData.message || 'Error fetching book details');
            }
            
            const data = await response.json();
            console.log('[fetchBookDetail] Success:', data);
            return data;
        } catch (error) {
            console.error('[fetchBookDetail] Catch error:', error);
            return rejectWithValue(error.message);
        }
    }
);


export const downloadBook = createAsyncThunk(
    'books/downloadBook',
    async ({ id, titulo }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const headers = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch(`https://localhost:7080/api/Libros/${id}/descargar`, {
                headers,
            });
            if (!response.ok) {
                throw new Error('Error downloading book');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${titulo || 'libro'}.epub`; // Assuming epub, or try to get from headers
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            return true;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCatalogBooks = createAsyncThunk(
    'books/fetchCatalogBooks',
    async ({ query, page, pageSize, autor, categorias }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await getBooksFromDataBase(query, page, pageSize, autor, categorias, token);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchTopViewedBooks = createAsyncThunk(
    'books/fetchTopViewedBooks',
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await getBooksFromDataBase("", 1, 10, "", [], token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchReports = createAsyncThunk(
    'books/fetchReports',
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await getBooksFromDataBase("", 2, 10, "", [], token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchTopRatedBooks = createAsyncThunk(
    'books/fetchTopRatedBooks',
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await getBooksFromDataBase("", 3, 10, "", [], token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const uploadBookAsync = createAsyncThunk(
    'books/uploadBook',
    async (formData, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch("https://localhost:7080/api/Libros/upload", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || errorData.message || 'Error al subir libro');
            }

            const data = await response.json().catch(() => ({}));
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateBook = createAsyncThunk(
    'books/updateBook',
    async ({ id, formData }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`https://localhost:7080/api/Libros/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
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
    async (id, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`https://localhost:7080/api/Libros/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Error deleting book');
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchBookForManagement = createAsyncThunk(
    'books/fetchBookForManagement',
    async (id, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const headers = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch(`https://localhost:7080/api/Libros/${id}`, {
                headers,
            });
            if (!response.ok) {
                throw new Error('Error fetching book for management');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchAllBooksAsync = createAsyncThunk(
    'books/fetchAllBooks',
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const headers = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch('https://localhost:7080/api/Libros', {
                headers,
            });
            if (!response.ok) {
                throw new Error('Error fetching all books');
            }
            const result = await response.json();
            return result.data || result;
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
        allBooks: {
            items: [],
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
            // fetchBookDetail
            .addCase(fetchBookDetail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBookDetail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentBook = action.payload;
            })
            .addCase(fetchBookDetail.rejected, (state, action) => {
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
            // fetchAllBooks
            .addCase(fetchAllBooksAsync.pending, (state) => {
                state.allBooks.status = 'loading';
            })
            .addCase(fetchAllBooksAsync.fulfilled, (state, action) => {
                state.allBooks.status = 'succeeded';
                state.allBooks.items = action.payload;
            })
            .addCase(fetchAllBooksAsync.rejected, (state, action) => {
                state.allBooks.status = 'failed';
                state.allBooks.error = action.payload;
            })
            // uploadBookAsync
            .addCase(uploadBookAsync.fulfilled, (state, action) => {
                // Optionally add to catalog if the response is the book object
                // state.catalog.items.push(action.payload);
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

export const selectAllBooks = (state) => state.books.allBooks.items;
export const selectAllBooksStatus = (state) => state.books.allBooks.status;
