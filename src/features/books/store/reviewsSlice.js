import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// GET todas las reseñas (paginado)
export const fetchReviewsAsync = createAsyncThunk(
    'reviews/fetchAll',
    async ({ page = 1, pageSize = 5 } = {}, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`https://localhost:7080/api/Resenas?page=${page}&pageSize=${pageSize}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener reseñas');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchBookReviewsAsync = createAsyncThunk(
    'reviews/fetchByBook',
    async ({ idLibro, page = 1, pageSize = 5 }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`https://localhost:7080/api/Resenas?idLibro=${idLibro}&page=${page}&pageSize=${pageSize}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener reseñas del libro');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createReviewAsync = createAsyncThunk(
    'reviews/create',
    async (reviewData, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch('https://localhost:7080/api/Resenas', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                if (data.errors && Array.isArray(data.errors)) {
                    return rejectWithValue(data.errors);
                }
                return rejectWithValue([data.message || 'Error al crear reseña']);
            }

            const data = await response.json().catch(() => ({}));
            return data;
        } catch (error) {
            return rejectWithValue([error.message]);
        }
    }
);

// PUT actualizar reseña
export const updateReviewAsync = createAsyncThunk(
    'reviews/update',
    async ({ idResena, texto }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`https://localhost:7080/api/Resenas/${idResena}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ texto })
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                if (data.errors && Array.isArray(data.errors)) {
                    return rejectWithValue(data.errors);
                }
                return rejectWithValue([data.message || 'Error al actualizar reseña']);
            }

            if (response.status === 204) {
                return { id: idResena, texto };
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue([error.message]);
        }
    }
);

// DELETE eliminar reseña
export const deleteReviewAsync = createAsyncThunk(
    'reviews/delete',
    async (idResena, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`https://localhost:7080/api/Resenas/${idResena}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al eliminar reseña');
            }

            return idResena;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    reviews: [],
    totalResenas: 0,
    page: 1,
    pageSize: 5,
    bookReviews: [],
    status: 'idle',
    createStatus: 'idle',
    updateStatus: 'idle',
    deleteStatus: 'idle',
    error: null,
    createError: null,
    updateError: null,
    deleteError: null
};

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        resetCreateStatus(state) {
            state.createStatus = 'idle';
            state.createError = null;
        },
        resetUpdateStatus(state) {
            state.updateStatus = 'idle';
            state.updateError = null;
        },
        resetDeleteStatus(state) {
            state.deleteStatus = 'idle';
            state.deleteError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviewsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReviewsAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.reviews = action.payload.resenas;
                state.totalResenas = action.payload.totalResenas;
                state.page = action.payload.page;
                state.pageSize = action.payload.pageSize;
            })
            .addCase(fetchReviewsAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(fetchBookReviewsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBookReviewsAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bookReviews = action.payload.resenas;
            })
            .addCase(fetchBookReviewsAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(createReviewAsync.pending, (state) => {
                state.createStatus = 'loading';
                state.createError = null;
            })
            .addCase(createReviewAsync.fulfilled, (state) => {
                state.createStatus = 'succeeded';
            })
            .addCase(createReviewAsync.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.createError = action.payload;
            })

            .addCase(updateReviewAsync.pending, (state) => {
                state.updateStatus = 'loading';
                state.updateError = null;
            })
            .addCase(updateReviewAsync.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';
                const index = state.reviews.findIndex(r => r.id === action.payload.id);
                if (index !== -1) {
                    state.reviews[index] = { ...state.reviews[index], ...action.payload };
                }
            })
            .addCase(updateReviewAsync.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.updateError = action.payload;
            })

            .addCase(deleteReviewAsync.pending, (state) => {
                state.deleteStatus = 'loading';
                state.deleteError = null;
            })
            .addCase(deleteReviewAsync.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded';
                state.reviews = state.reviews.filter(r => r.id !== action.payload);
                state.totalResenas -= 1;
            })
            .addCase(deleteReviewAsync.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.deleteError = action.payload;
            });
    }
});

export const selectAllReviews = (state) => state.reviews.reviews;
export const selectBookReviews = (state) => state.reviews.bookReviews;
export const selectReviewsStatus = (state) => state.reviews.status;
export const selectReviewsPagination = (state) => state.reviews.pagination;

export const selectCreateStatus = (state) => state.reviews.createStatus;
export const selectCreateError = (state) => state.reviews.createError;

export const selectUpdateStatus = (state) => state.reviews.updateStatus;
export const selectUpdateError = (state) => state.reviews.updateError;

export const selectDeleteStatus = (state) => state.reviews.deleteStatus;
export const selectDeleteError = (state) => state.reviews.deleteError;

export const selectTotalResenas = (state) => state.reviews.totalResenas;
export const selectPage = (state) => state.reviews.page;
export const selectPageSize = (state) => state.reviews.pageSize;

export const { resetCreateStatus, resetUpdateStatus, resetDeleteStatus } = reviewsSlice.actions;

export default reviewsSlice.reducer;
