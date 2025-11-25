import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async ({ pageNumber = 1, pageSize = 50 } = {}, { rejectWithValue }) => {
        try {
            const url = new URL("https://localhost:7080/api/Categorias");
            url.searchParams.append("pageNumber", pageNumber);
            url.searchParams.append("pageSize", pageSize);

            const response = await fetch(url.toString());
            if (!response.ok) throw new Error("Error al obtener categorías");

            const data = await response.json();
            return data.results || [];
        } catch (error) {
            console.error("Error al obtener categorías:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (categoryData, { rejectWithValue }) => {
        try {
            const response = await fetch("https://localhost:7080/api/Categorias", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });
            if (!response.ok) throw new Error('Error creating category');
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateCategory = createAsyncThunk(
    'categories/updateCategory',
    async ({ id, categoryData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://localhost:7080/api/Categorias/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });
            if (!response.ok) throw new Error('Error updating category');
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://localhost:7080/api/Categorias/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Error deleting category');
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // addCategory
            .addCase(addCategory.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // updateCategory
            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.items.findIndex(cat => cat.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            // deleteCategory
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.items = state.items.filter(cat => cat.id !== action.payload);
            });
    },
});

export default categoriesSlice.reducer;

export const selectAllCategories = (state) => state.categories?.items || [];
export const selectCategoriesStatus = (state) => state.categories?.status || 'idle';
export const selectCategoriesError = (state) => state.categories?.error || null;
