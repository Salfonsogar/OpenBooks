import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsersAsync = createAsyncThunk(
    'users/fetchUsers',
    async ({ pageNumber = 1, pageSize = 10 } = {}, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`https://localhost:7080/api/Usuarios?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener usuarios');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createUserAsync = createAsyncThunk(
    'users/createUser',
    async (userData, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch('https://localhost:7080/api/Usuarios', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.errors && Array.isArray(data.errors)) {
                    return rejectWithValue(data.errors);
                }
                return rejectWithValue([data.message || 'Error al crear usuario']);
            }

            return data;
        } catch (error) {
            return rejectWithValue([error.message]);
        }
    }
);

export const updateUserAsync = createAsyncThunk(
    'users/updateUser',
    async ({ id, userData }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`https://localhost:7080/api/Usuarios/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                if (data.errors && Array.isArray(data.errors)) {
                    return rejectWithValue(data.errors);
                }
                return rejectWithValue([data.message || 'Error al actualizar usuario']);
            }

            // Si la respuesta es 204 No Content, devolver el usuario actualizado con los datos enviados
            if (response.status === 204) {
                return { id, ...userData };
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue([error.message]);
        }
    }
);

export const deleteUserAsync = createAsyncThunk(
    'users/deleteUser',
    async (id, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`https://localhost:7080/api/Usuarios/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al eliminar usuario');
            }

            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    users: [],
    totalRecords: 0,
    pageSize: 10,
    currentPage: 1,
    totalPages: 1,
    status: 'idle',
    error: null,
    createStatus: 'idle',
    createError: null,
    updateStatus: 'idle',
    updateError: null,
    deleteStatus: 'idle',
    deleteError: null
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetCreateStatus: (state) => {
            state.createStatus = 'idle';
            state.createError = null;
        },
        resetUpdateStatus: (state) => {
            state.updateStatus = 'idle';
            state.updateError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsersAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload.results;
                state.totalRecords = action.payload.totalRecords;
                state.pageSize = action.payload.pageSize;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchUsersAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Create User
            .addCase(createUserAsync.pending, (state) => {
                state.createStatus = 'loading';
                state.createError = null;
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.createStatus = 'succeeded';
            })
            .addCase(createUserAsync.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.createError = action.payload;
            })
            // Update User
            .addCase(updateUserAsync.pending, (state) => {
                state.updateStatus = 'loading';
                state.updateError = null;
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';
                const index = state.users.findIndex(u => u.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUserAsync.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.updateError = action.payload;
            })
            // Delete User
            .addCase(deleteUserAsync.pending, (state) => {
                state.deleteStatus = 'loading';
            })
            .addCase(deleteUserAsync.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded';
                state.users = state.users.filter(u => u.id !== action.payload);
            })
            .addCase(deleteUserAsync.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.deleteError = action.payload;
            });
    }
});

export const { resetCreateStatus, resetUpdateStatus } = usersSlice.actions;

export const selectAllUsers = (state) => state.users.users;
export const selectUsersStatus = (state) => state.users.status;
export const selectUsersError = (state) => state.users.error;
export const selectUserCreateStatus = (state) => state.users.createStatus;
export const selectUserCreateError = (state) => state.users.createError;
export const selectUserUpdateStatus = (state) => state.users.updateStatus;
export const selectUserUpdateError = (state) => state.users.updateError;
export const selectUserDeleteStatus = (state) => state.users.deleteStatus;
export const selectUsersPagination = (state) => ({
    currentPage: state.users.currentPage,
    totalPages: state.users.totalPages,
    totalRecords: state.users.totalRecords,
    pageSize: state.users.pageSize
});

export default usersSlice.reducer;
