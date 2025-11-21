import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchReviewsByBookId = createAsyncThunk(
    'reviews/fetchReviewsByBookId',
    async (bookId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5181/api/Resena/libro/${bookId}`);
            if (!response.ok) {
                throw new Error('Error fetching reviews');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addReview = createAsyncThunk(
    'reviews/addReview',
    async ({ bookId, userId, comment, rating }, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:5181/api/Resena', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    libroId: bookId,
                    usuarioId: userId,
                    comentario: comment,
                    calificacion: rating // Assuming the API supports rating in the review object
                }),
            });

            if (!response.ok) {
                throw new Error('Error adding review');
            }

            // Return the new review data or just the input if API doesn't return it
            // Ideally API returns the created review
            return { libroId: bookId, usuarioId: userId, comentario: comment, calificacion: rating, fecha: new Date().toISOString() };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        addStatus: 'idle',
        addError: null,
    },
    reducers: {
        clearReviews: (state) => {
            state.items = [];
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviewsByBookId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReviewsByBookId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchReviewsByBookId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addReview.pending, (state) => {
                state.addStatus = 'loading';
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.addStatus = 'succeeded';
                // Optimistically add the review or re-fetch? 
                // For now, let's assume we re-fetch or the component handles it. 
                // But adding it to state is better UX.
                // Note: The API response structure matters here.
                // If the API returns the created review with ID and user info, we push it.
                // If not, we might need to re-fetch.
                // Let's push what we have for now, assuming the component will trigger a re-fetch if needed.
                // state.items.push(action.payload); 
                // Actually, let's just set status to succeeded and let the component re-fetch or we can re-fetch in the thunk.
                // Re-fetching in the component is safer if we don't know the exact return shape.
            })
            .addCase(addReview.rejected, (state, action) => {
                state.addStatus = 'failed';
                state.addError = action.payload;
            });
    },
});

export const { clearReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;

export const selectReviews = (state) => state.reviews.items;
export const selectReviewsStatus = (state) => state.reviews.status;
export const selectReviewsError = (state) => state.reviews.error;
export const selectAddReviewStatus = (state) => state.reviews.addStatus;
