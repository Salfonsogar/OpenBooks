import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRolesAsync = createAsyncThunk(
    'roles/fetchRoles',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch('https://localhost:7080/api/Rols');
            if (!res.ok) {
                throw new Error('Error al obtener roles');
            }
            const data = await res.json();
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const initialState = {
    roles: [],
    status: 'idle',
    error: null,
};

const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRolesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRolesAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.roles = action.payload;
            })
            .addCase(fetchRolesAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default rolesSlice.reducer;

export const selectAllRoles = (state) => state.roles.roles;
export const selectRolesStatus = (state) => state.roles.status;
