import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSancionesPorUsuarioAsync = createAsyncThunk(
    'sanciones/fetchPorUsuario',
    async (idUsuario, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`https://localhost:7080/api/Sancion/usuario/${idUsuario}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener sanciones');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createSancionAsync = createAsyncThunk(
    'sanciones/create',
    async (sancionData, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch('https://localhost:7080/api/Sancion', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sancionData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || errorData.title || 'Error al crear sanción');
            }

            // The API might not return the created object, or might return it.
            // We'll log what we get.
            const data = await response.json().catch(() => ({}));

            // If the API doesn't return the full object with ID, we might need to re-fetch
            // or optimistically add it. For now, let's return what we sent + response data.
            return { ...sancionData, ...data };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteSancionAsync = createAsyncThunk(
    'sanciones/delete',
    async (id, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`https://localhost:7080/api/Sancion/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al eliminar sanción');
            }

            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchAllSancionesAsync = createAsyncThunk(
    'sanciones/fetchAll',
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch('https://localhost:7080/api/Sancion', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener todas las sanciones');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    sanciones: [],
    status: 'idle',
    error: null,
    createStatus: 'idle',
    deleteStatus: 'idle',
};

const sancionesSlice = createSlice({
    name: 'sanciones',
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
            state.createStatus = 'idle';
            state.deleteStatus = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchSancionesPorUsuarioAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSancionesPorUsuarioAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sanciones = action.payload;
            })
            .addCase(fetchSancionesPorUsuarioAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Create
            .addCase(createSancionAsync.pending, (state) => {
                state.createStatus = 'loading';
            })
            .addCase(createSancionAsync.fulfilled, (state, action) => {
                state.createStatus = 'succeeded';
                // Optimistically add or just trigger a re-fetch in the component
                // For now, let's assume we re-fetch in the component
            })
            .addCase(createSancionAsync.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.error = action.payload;
            })
            // Delete
            .addCase(deleteSancionAsync.pending, (state) => {
                state.deleteStatus = 'loading';
            })
            .addCase(deleteSancionAsync.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded';
                state.sanciones = state.sanciones.filter(s => s.id !== action.payload);
            })
            .addCase(deleteSancionAsync.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.error = action.payload;
            })
            // fetchAllSanciones
            .addCase(fetchAllSancionesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllSancionesAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sanciones = action.payload;
            })
            .addCase(fetchAllSancionesAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { resetStatus } = sancionesSlice.actions;
export default sancionesSlice.reducer;

// Selectors
export const selectSanciones = (state) => state.sanciones.sanciones;
export const selectAllSanciones = (state) => state.sanciones.sanciones;
export const selectSancionesStatus = (state) => state.sanciones.status;
export const selectSancionesCreateStatus = (state) => state.sanciones.createStatus;
export const selectSancionesDeleteStatus = (state) => state.sanciones.deleteStatus;
export const selectSancionesError = (state) => state.sanciones.error;
