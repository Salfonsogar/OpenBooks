import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import booksReducer from './booksSlice';
import rolesReducer from './rolesSlice';
import usersReducer from './usersSlice';
import denunciasReducer from './denunciasSlice';
import reviewsReducer from './reviewsSlice';
import categoriesReducer from './categoriesSlice';
import sancionesReducer from './sancionesSlice';
import sugerenciasReducer from './sugerenciasSlice';
import libraryReducer from './librarySlice';
import ratingsReducer from './ratingsSlice';
import readerReducer from './readerSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    library: libraryReducer,
    roles: rolesReducer,
    users: usersReducer,
    denuncias: denunciasReducer,
    reviews: reviewsReducer,
    categories: categoriesReducer,
    sanciones: sancionesReducer,
    sugerencias: sugerenciasReducer,
    ratings: ratingsReducer,
    reader: readerReducer,
  },
});

export default store;
