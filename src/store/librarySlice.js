import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserLibrary = createAsyncThunk(
    'library/fetchUserLibrary',
    async ({ page = 1, pageSize = 10 }, { rejectWithValue, getState }) => {
        try {
            const { user, token } = getState().auth;
            if (!user || !token) throw new Error('Usuario no autenticado');

            const userId = user.id || user.Id;
            const response = await fetch(`https://localhost:7080/api/Biblioteca/${userId}/libros?page=${page}&pageSize=${pageSize}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener la biblioteca');
            }

            const data = await response.json();
            return data; // Expected structure: { data: [], totalPages: 1, ... } or similar based on booksSlice
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addBookToLibrary = createAsyncThunk(
    'library/addBookToLibrary',
    async (libroId, { rejectWithValue, getState }) => {
        try {
            const { user, token } = getState().auth;
            if (!user || !token) throw new Error('Usuario no autenticado');

            const userId = user.id || user.Id;
            const response = await fetch(`https://localhost:7080/api/Biblioteca/${userId}/libros/${libroId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Error al agregar libro a la biblioteca');
            }

            return libroId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeBookFromLibrary = createAsyncThunk(
    'library/removeBookFromLibrary',
    async (libroId, { rejectWithValue, getState }) => {
        try {
            const { user, token } = getState().auth;
            if (!user || !token) throw new Error('Usuario no autenticado');

            const userId = user.id || user.Id;
            const response = await fetch(`https://localhost:7080/api/Biblioteca/${userId}/libros/${libroId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar libro de la biblioteca');
            }

            return libroId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const librarySlice = createSlice({
    name: 'library',
    initialState: {
        items: [],
        totalPages: 1,
        status: 'idle',
        error: null,
        actionStatus: 'idle', // for add/remove actions
        actionError: null,
    },
    reducers: {
        clearLibraryActionStatus: (state) => {
            state.actionStatus = 'idle';
            state.actionError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchUserLibrary
            .addCase(fetchUserLibrary.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserLibrary.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Assuming response structure matches what booksSlice expects or is standard
                // If the API returns { data: [...], totalPages: ... }
                state.items = action.payload.data || action.payload;
                state.totalPages = action.payload.totalPages || 1;
            })
            .addCase(fetchUserLibrary.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // addBookToLibrary
            .addCase(addBookToLibrary.pending, (state) => {
                state.actionStatus = 'loading';
            })
            .addCase(addBookToLibrary.fulfilled, (state) => {
                state.actionStatus = 'succeeded';
            })
            .addCase(addBookToLibrary.rejected, (state, action) => {
                state.actionStatus = 'failed';
                state.actionError = action.payload;
            })
            // removeBookFromLibrary
            .addCase(removeBookFromLibrary.pending, (state) => {
                state.actionStatus = 'loading';
            })
            .addCase(removeBookFromLibrary.fulfilled, (state, action) => {
                state.actionStatus = 'succeeded';
                state.items = state.items.filter(book => book.id !== action.payload);
            })
            .addCase(removeBookFromLibrary.rejected, (state, action) => {
                state.actionStatus = 'failed';
                state.actionError = action.payload;
            });
    },
});

export const { clearLibraryActionStatus } = librarySlice.actions;
export default librarySlice.reducer;

export const selectLibraryBooks = (state) => state.library.items;
export const selectLibraryStatus = (state) => state.library.status;
export const selectLibraryTotalPages = (state) => state.library.totalPages;
export const selectLibraryActionStatus = (state) => state.library.actionStatus;
