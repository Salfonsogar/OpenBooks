import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://localhost:7080/api/Valoraciones';

// POST - Crear valoración
export const createRating = createAsyncThunk(
    'ratings/create',
    async ({ idLibro, puntuacion }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const body = { idLibro, puntuacion };
            console.log('Creating rating:', body);

            const response = await fetch(API_URL, {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            const result = await response.json();
            console.log('Rating created:', result);
            return result;
        } catch (error) {
            console.error('Create rating error:', error);
            return rejectWithValue(error.message);
        }
    }
);

// PUT - Actualizar valoración
export const updateRating = createAsyncThunk(
    'ratings/update',
    async ({ idLibro, puntuacion }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            console.log('Updating rating:', { puntuacion });

            const response = await fetch(API_URL, {
                method: 'PUT',
                headers,
                body: JSON.stringify({ puntuacion })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            return { idLibro, puntuacion };
        } catch (error) {
            console.error('Update rating error:', error);
            return rejectWithValue(error.message);
        }
    }
);

// DELETE - Eliminar valoración
export const deleteRating = createAsyncThunk(
    'ratings/delete',
    async (id, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const headers = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers
            });

            if (!response.ok) {
                throw new Error('Error al eliminar valoración');
            }

            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// GET - Obtener valoración por libro
export const getRatingByBook = createAsyncThunk(
    'ratings/getByBook',
    async (idLibro, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const headers = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch(`${API_URL}/libro/${idLibro}`, {
                headers
            });

            if (!response.ok) {
                if (response.status === 404) {
                    return null;
                }
                throw new Error('Error al obtener valoración');
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// GET - Obtener top 5 valoraciones
export const getTop5Ratings = createAsyncThunk(
    'ratings/getTop5',
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const headers = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch(`${API_URL}/top5`, {
                headers
            });

            if (!response.ok) {
                throw new Error('Error al obtener top 5');
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const ratingsSlice = createSlice({
    name: 'ratings',
    initialState: {
        userRatings: {},
        top5: [],
        status: 'idle',
        error: null
    },
    reducers: {
        clearRatingsError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRating.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createRating.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload) {
                    state.userRatings[action.payload.idLibro] = action.payload.puntuacion;
                }
            })
            .addCase(createRating.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateRating.fulfilled, (state, action) => {
                state.userRatings[action.payload.idLibro] = action.payload.puntuacion;
            })
            .addCase(deleteRating.fulfilled, (state, action) => {
                delete state.userRatings[action.payload];
            })
            .addCase(getRatingByBook.fulfilled, (state, action) => {
                if (action.payload) {
                    state.userRatings[action.payload.idLibro] = action.payload.puntuacion;
                }
            })
            .addCase(getTop5Ratings.fulfilled, (state, action) => {
                state.top5 = action.payload;
            });
    }
});

export const { clearRatingsError } = ratingsSlice.actions;

export const selectUserRating = (state, idLibro) => state.ratings.userRatings[idLibro];
export const selectTop5Ratings = (state) => state.ratings.top5;
export const selectRatingsStatus = (state) => state.ratings.status;
export const selectRatingsError = (state) => state.ratings.error;

export default ratingsSlice.reducer;
