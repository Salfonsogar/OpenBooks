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
            console.log('GET /api/Sancion/usuario/{id} response:', data);
            return data;
        } catch (error) {
            console.error('Error fetching sanciones:', error);
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
                throw new Error(errorData.message || 'Error al crear sanción');
            }

            // The API might not return the created object, or might return it.
            // We'll log what we get.
            const data = await response.json().catch(() => ({}));
            console.log('POST /api/Sancion response:', data);

            // If the API doesn't return the full object with ID, we might need to re-fetch
            // or optimistically add it. For now, let's return what we sent + response data.
            return { ...sancionData, ...data };
        } catch (error) {
            console.error('Error creating sancion:', error);
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

            console.log(`DELETE /api/Sancion/${id} response status:`, response.status);
            return id;
        } catch (error) {
            console.error('Error deleting sancion:', error);
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
            });
    }
});

export const { resetStatus } = sancionesSlice.actions;
export default sancionesSlice.reducer;
