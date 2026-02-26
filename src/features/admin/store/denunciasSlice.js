import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDenunciasAsync = createAsyncThunk(
    'denuncias/fetchDenuncias',
    async ({ pagina = 1, tamanoPagina = 10 } = {}, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`https://localhost:7080/api/Denuncia?pagina=${pagina}&tamanoPagina=${tamanoPagina}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener denuncias');
            }
            const data = await response.json();
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const createDenunciaAsync = createAsyncThunk(
    'denuncias/create',
    async (denunciaData, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch('https://localhost:7080/api/Denuncia', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(denunciaData)
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                if (data.errors && Array.isArray(data.errors)) {
                    return rejectWithValue(data.errors);
                }
                return rejectWithValue([data.message || 'Error al crear denuncia']);
            }

            const data = await response.json().catch(() => ({}));
            return data;
        } catch (error) {
            return rejectWithValue([error.message]);
        }
    }
);

export const deleteDenunciaAsync = createAsyncThunk(
    'denuncias/delete',
    async (id, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`https://localhost:7080/api/Denuncia/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al eliminar denuncia');
            }

            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    denuncias: [],
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

const denunciasSlice = createSlice({
    name: 'denuncias',
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
            .addCase(fetchDenunciasAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDenunciasAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (Array.isArray(action.payload)) {
                    state.denuncias = action.payload;
                    state.totalRecords = action.payload.length;
                } else {
                    // Map API response: datos, paginaActual, tamanoPagina, totalPaginas, totalRegistros
                    state.denuncias = action.payload.datos || action.payload.denuncias || action.payload.results || [];
                    state.totalRecords = action.payload.totalRegistros || action.payload.totalRecords || 0;
                    state.pagina = action.payload.paginaActual || action.payload.pagina || state.pagina;
                    state.tamanoPagina = action.payload.tamanoPagina || state.tamanoPagina;
                }
            })
            .addCase(fetchDenunciasAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Create
            .addCase(createDenunciaAsync.pending, (state) => {
                state.createStatus = 'loading';
                state.createError = null;
            })
            .addCase(createDenunciaAsync.fulfilled, (state, action) => {
                state.createStatus = 'succeeded';
                // Optimistically add or just let the re-fetch handle it. 
                // Since we usually re-fetch after create in the component, we can leave it.
            })
            .addCase(createDenunciaAsync.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.createError = action.payload;
            })
            // Delete
            .addCase(deleteDenunciaAsync.pending, (state) => {
                state.deleteStatus = 'loading';
            })
            .addCase(deleteDenunciaAsync.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded';
                state.denuncias = state.denuncias.filter(d => d.id !== action.payload);
                state.totalRecords -= 1;
            })
            .addCase(deleteDenunciaAsync.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.deleteError = action.payload;
            });
    },
});

export const { resetCreateStatus, resetDeleteStatus } = denunciasSlice.actions;

export default denunciasSlice.reducer;

export const selectAllDenuncias = (state) => state.denuncias.denuncias;
export const selectDenunciasStatus = (state) => state.denuncias.status;
export const selectDenunciasError = (state) => state.denuncias.error;
export const selectDenunciasPagination = (state) => ({
    pagina: state.denuncias.pagina,
    tamanoPagina: state.denuncias.tamanoPagina,
    totalRecords: state.denuncias.totalRecords,
    totalPages: Math.ceil(state.denuncias.totalRecords / state.denuncias.tamanoPagina)
});
export const selectDenunciasCreateStatus = (state) => state.denuncias.createStatus;
export const selectDenunciasCreateError = (state) => state.denuncias.createError;
export const selectDenunciasDeleteStatus = (state) => state.denuncias.deleteStatus;
