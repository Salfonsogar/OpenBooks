import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const body = {
        correo: credentials.correo,
        contrasena: credentials.contrasena,
      };

      console.log("BODY ENVIADO:", body);

      const res = await fetch('https://localhost:7080/api/Usuarios/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => null);
        const message = (error && error.Message) || 'Error en autenticación';
        return rejectWithValue(message);
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);


const initialState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      try {
        sessionStorage.removeItem('auth');
      } catch (err) { console.warn('authSlice logout sessionStorage remove error', err); }
    },
    loadFromSession(state) {
      try {
        const raw = sessionStorage.getItem('auth');
        if (raw) {
          const parsed = JSON.parse(raw);
          state.user = parsed.user || null;
          state.token = parsed.token || null;
        }
      } catch (err) { console.warn('authSlice loadFromSession error', err); }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        const payload = action.payload || {};
        if (!payload.Usuario || !payload.Token) {
          state.status = 'failed';
          state.error = 'Respuesta inválida del servidor';
          state.user = null;
          state.token = null;
          try { sessionStorage.removeItem('auth'); } catch (e) { console.warn('authSlice sessionStorage remove error', e); }
          return;
        }

        state.status = 'succeeded';
        state.user = payload.Usuario;
        state.token = payload.Token;
        state.error = null;
        try {
          sessionStorage.setItem('auth', JSON.stringify({ user: state.user, token: state.token }));
        } catch (e) { console.warn('authSlice sessionStorage set error', e); }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error?.message || 'Error en login';
      });
  },
});

export const { logout, loadFromSession } = authSlice.actions;

export default authSlice.reducer;

export const selectAuthUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => Boolean(state.auth && state.auth.token);
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
