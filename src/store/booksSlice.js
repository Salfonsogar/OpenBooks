import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBookById = createAsyncThunk(
    'books/fetchBookById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5181/api/Libros/${id}`);
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

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        currentBook: null,
        status: 'idle',
        error: null,
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
            });
    },
});

export const { clearCurrentBook } = booksSlice.actions;
export default booksSlice.reducer;

export const selectCurrentBook = (state) => state.books.currentBook;
export const selectBookStatus = (state) => state.books.status;
export const selectBookError = (state) => state.books.error;
