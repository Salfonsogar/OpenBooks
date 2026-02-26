import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// AsyncThunk para resetear contraseña
export const resetPasswordAsync = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, nuevaContraseña }, { rejectWithValue }) => {
    try {
      const res = await fetch('https://localhost:7080/api/Usuarios/ResetearContrasena', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, nuevaContraseña }),
      });

      // Intentar parsear la respuesta JSON
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        // Manejar el formato de error del backend
        const errorMessage = data?.message || data?.Message || 'Error al resetear contraseña';
        return rejectWithValue(errorMessage);
      }

      return data;
    } catch (err) {
      // Manejar errores de red o de conexión
      return rejectWithValue(err.message || 'Error de conexión con el servidor');
    }
  }
);

// AsyncThunk para registro
export const registerAsync = createAsyncThunk(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch('https://localhost:7080/api/Usuarios/Register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data && data.errors && Array.isArray(data.errors)) {
          return rejectWithValue(data.errors.join('. '));
        } else if (data && data.Message) {
          return rejectWithValue(data.Message);
        } else {
          return rejectWithValue('Error al registrar usuario');
        }
      }
      try {
        sessionStorage.setItem('auth', JSON.stringify({ user: data }));
      } catch (e) { console.warn('authSlice sessionStorage set error', e); }
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

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
      console.log("LOGIN RESPONSE DATA:", data);
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

const normalizeUser = (user) => {
  if (!user) return null;
  return {
    ...user,
    nombreRol: user.nombreRol || user.NombreRol || user.rol || user.Rol || "Usuario"
  };
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
          state.user = normalizeUser(parsed.user || null);
          state.token = parsed.token || null;
        }
      } catch (err) { console.warn('authSlice loadFromSession error', err); }
    },
    updateUserProfile(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        try {
          sessionStorage.setItem('auth', JSON.stringify({ user: state.user, token: state.token }));
        } catch (err) { console.warn('authSlice updateUserProfile sessionStorage error', err); }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Resetear contraseña
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(resetPasswordAsync.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error?.message || 'Error al resetear contraseña';
      })
      // Registro
      .addCase(registerAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error?.message || 'Error en registro';
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        const payload = action.payload || {};
        if (!payload.usuario || !payload.token) {
          state.status = 'failed';
          state.error = 'Respuesta inválida del servidor';
          state.user = null;
          state.token = null;
          try { sessionStorage.removeItem('auth'); } catch (e) { console.warn('authSlice sessionStorage remove error', e); }
          return;
        }

        state.status = 'succeeded';
        state.user = normalizeUser(payload.usuario);
        state.token = payload.token;
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

export const { logout, loadFromSession, updateUserProfile } = authSlice.actions;

export default authSlice.reducer;

export const selectAuthUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => Boolean(state.auth && state.auth.token);
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
