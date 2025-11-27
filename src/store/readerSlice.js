import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk para obtener el manifiesto del libro
export const fetchManifest = createAsyncThunk(
    'reader/fetchManifest',
    async (bookId, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const headers = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;
            const response = await fetch(`https://localhost:7080/api/Libros/${bookId}/epub/manifest`, {
                headers,
            });

            if (!response.ok) {
                throw new Error('Error al cargar el manifiesto');
            }

            const manifest = await response.json();
            return { bookId, manifest };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Thunk para obtener el contenido de un recurso específico del manifiesto
export const fetchResource = createAsyncThunk(
    'reader/fetchResource',
    async ({ bookId, resourcePath }, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const cache = state.reader.resourceCache;

            // 2.2 Implementar caché
            if (cache[resourcePath]) {
                return { resourcePath, content: cache[resourcePath] };
            }

            const token = state.auth.token;
            const headers = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const encodedPath = encodeURIComponent(resourcePath);
            const response = await fetch(
                `https://localhost:7080/api/Libros/${bookId}/epub/resource?path=${encodedPath}`,
                { headers }
            );

            if (!response.ok) {
                throw new Error('Error al cargar el recurso');
            }

            let content = await response.text();

            // Eliminar enlaces <a> pero mantener su contenido
            content = content.replace(/<a\b[^>]*>(.*?)<\/a>/gi, "$1");

            // 2.3 Reescribir rutas relativas (src, href y url)
            content = content.replace(/(src|href)="([^"]+)"/g, (match, attr, path) => {
                if (path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:')) return match;
                const encodedPath = encodeURIComponent(path);
                return `${attr}="https://localhost:7080/api/Libros/${bookId}/epub/resource?path=${encodedPath}"`;
            });

            // Reescribir url(...) en estilos
            content = content.replace(/url\(['"]?([^'")]+)['"]?\)/g, (match, path) => {
                if (path.startsWith('http') || path.startsWith('data:')) return match;
                const encodedPath = encodeURIComponent(path);
                return `url('https://localhost:7080/api/Libros/${bookId}/epub/resource?path=${encodedPath}')`;
            });

            return { resourcePath, content };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const readerSlice = createSlice({
    name: 'reader',
    initialState: {
        bookId: null,
        manifest: null,
        currentIndex: 0,
        currentContent: null,
        status: 'idle',
        error: null,
        resourceCache: {},
        resourceCache: {},
    },
    reducers: {
        goNext: (state) => {
            if (state.manifest && state.manifest.readingOrder) {
                const maxIndex = state.manifest.readingOrder.length - 1;
                if (state.currentIndex < maxIndex) {
                    state.currentIndex += 1;
                    state.currentContent = null;
                    state.readingStartTime = null; // Reset timer on nav
                }
            }
        },
        goPrevious: (state) => {
            if (state.currentIndex > 0) {
                state.currentIndex -= 1;
                state.currentContent = null;
                state.currentContent = null;
            }
        },

        goToIndex: (state, action) => {
            const index = action.payload;
            if (state.manifest && state.manifest.readingOrder) {
                const maxIndex = state.manifest.readingOrder.length - 1;
                if (index >= 0 && index <= maxIndex) {
                    state.currentIndex = index;
                    state.currentContent = null;
                    state.readingStartTime = null; // Reset timer on nav
                }
            }
        },

        closeReader: (state) => {
            state.bookId = null;
            state.manifest = null;
            state.currentIndex = 0;
            state.currentContent = null;
            state.status = 'idle';
            state.error = null;
            state.resourceCache = {};
            state.resourceCache = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchManifest.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchManifest.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bookId = action.payload.bookId;
                state.manifest = action.payload.manifest;
                state.currentIndex = 0;
                state.currentContent = null;
            })
            .addCase(fetchManifest.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(fetchResource.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchResource.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentContent = action.payload.content;
                state.resourceCache[action.payload.resourcePath] = action.payload.content;

                state.resourceCache[action.payload.resourcePath] = action.payload.content;
            })
            .addCase(fetchResource.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { goNext, goPrevious, goToIndex, closeReader } = readerSlice.actions;

export default readerSlice.reducer;

export const selectReaderBookId = (state) => state.reader.bookId;
export const selectReaderManifest = (state) => state.reader.manifest;
export const selectCurrentIndex = (state) => state.reader.currentIndex;
export const selectCurrentContent = (state) => state.reader.currentContent;
export const selectReaderStatus = (state) => state.reader.status;
export const selectReaderError = (state) => state.reader.error;

export const selectCurrentResource = (state) => {
    const { manifest, currentIndex } = state.reader;
    if (manifest && manifest.readingOrder && manifest.readingOrder[currentIndex]) {
        return manifest.readingOrder[currentIndex];
    }
    return null;
};

export const selectHasNext = (state) => {
    const { manifest, currentIndex } = state.reader;
    if (manifest && manifest.readingOrder) {
        return currentIndex < manifest.readingOrder.length - 1;
    }
    return false;
};

export const selectHasPrevious = (state) => {
    return state.reader.currentIndex > 0;
};
