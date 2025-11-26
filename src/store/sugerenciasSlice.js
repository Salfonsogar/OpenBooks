import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

export const fetchSugerenciasAsync = createAsyncThunk(
    'sugerencias/fetchSugerencias',
    async ({ pagina = 1, tamanoPagina = 10 } = {}, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`https://localhost:7080/api/Sugerencia?pagina=${pagina}&tamanoPagina=${tamanoPagina}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener sugerencias');
            }
            const data = await response.json();
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const createSugerenciaAsync = createAsyncThunk(
    'sugerencias/create',
    async (sugerenciaData, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch('https://localhost:7080/api/Sugerencia', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sugerenciaData)
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                if (data.errors && Array.isArray(data.errors)) {
                    return rejectWithValue(data.errors);
                }
                return rejectWithValue([data.message || 'Error al crear sugerencia']);
            }

            const data = await response.json().catch(() => ({}));
            return data;
        } catch (error) {
            return rejectWithValue([error.message]);
        }
    }
);

export const deleteSugerenciaAsync = createAsyncThunk(
    'sugerencias/delete',
    async (id, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`https://localhost:7080/api/Sugerencia/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al eliminar sugerencia');
            }

            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    sugerencias: [],
    totalRecords: 0,
    pagina: 1,
    tamanoPagina: 10,
    status: 'idle',
    error: null,
    createStatus: 'idle',
    createError: null,
    deleteStatus: 'idle',
    deleteError: null
};

const sugerenciasSlice = createSlice({
    name: 'sugerencias',
    initialState,
    reducers: {
        resetCreateStatus: (state) => {
            state.createStatus = 'idle';
            state.createError = null;
        },
        resetDeleteStatus: (state) => {
            state.deleteStatus = 'idle';
            state.deleteError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchSugerenciasAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSugerenciasAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (Array.isArray(action.payload)) {
                    state.sugerencias = action.payload;
                    state.totalRecords = action.payload.length;
                } else {
                    // Map API response: datos, paginaActual, tamanoPagina, totalPaginas, totalRegistros
                    state.sugerencias = action.payload.datos || action.payload.sugerencias || action.payload.results || [];
                    state.totalRecords = action.payload.totalRegistros || action.payload.totalRecords || 0;
                    state.pagina = action.payload.paginaActual || action.payload.pagina || state.pagina;
                    state.tamanoPagina = action.payload.tamanoPagina || state.tamanoPagina;
                }
            })
            .addCase(fetchSugerenciasAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Create
            .addCase(createSugerenciaAsync.pending, (state) => {
                state.createStatus = 'loading';
                state.createError = null;
            })
            .addCase(createSugerenciaAsync.fulfilled, (state, action) => {
                state.createStatus = 'succeeded';
            })
            .addCase(createSugerenciaAsync.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.createError = action.payload;
            })
            // Delete
            .addCase(deleteSugerenciaAsync.pending, (state) => {
                state.deleteStatus = 'loading';
            })
            .addCase(deleteSugerenciaAsync.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded';
                state.sugerencias = state.sugerencias.filter(s => s.id !== action.payload);
                state.totalRecords -= 1;
            })
            .addCase(deleteSugerenciaAsync.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.deleteError = action.payload;
            });
    },
});

export const { resetCreateStatus, resetDeleteStatus } = sugerenciasSlice.actions;

export default sugerenciasSlice.reducer;

export const selectAllSugerencias = (state) => state.sugerencias.sugerencias;
export const selectSugerenciasStatus = (state) => state.sugerencias.status;
export const selectSugerenciasError = (state) => state.sugerencias.error;
export const selectSugerenciasPagination = createSelector(
    [(state) => state.sugerencias.pagina,
    (state) => state.sugerencias.tamanoPagina,
    (state) => state.sugerencias.totalRecords],
    (pagina, tamanoPagina, totalRecords) => ({
        pagina,
        tamanoPagina,
        totalRecords,
        totalPages: Math.ceil(totalRecords / tamanoPagina)
    })
);
export const selectSugerenciasCreateStatus = (state) => state.sugerencias.createStatus;
export const selectSugerenciasCreateError = (state) => state.sugerencias.createError;
export const selectSugerenciasDeleteStatus = (state) => state.sugerencias.deleteStatus;
