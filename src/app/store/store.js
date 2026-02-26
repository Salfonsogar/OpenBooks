import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/store/authSlice';
import booksReducer from '../../features/books/store/booksSlice';
import rolesReducer from '../../features/auth/store/rolesSlice';
import usersReducer from '../../features/admin/store/usersSlice';
import denunciasReducer from '../../features/admin/store/denunciasSlice';
import reviewsReducer from '../../features/books/store/reviewsSlice';
import categoriesReducer from '../../features/books/store/categoriesSlice';
import sancionesReducer from '../../features/admin/store/sancionesSlice';
import sugerenciasReducer from '../../features/admin/store/sugerenciasSlice';
import libraryReducer from '../../features/books/store/librarySlice';
import ratingsReducer from '../../features/books/store/ratingsSlice';
import readerReducer from '../../features/reader/store/readerSlice';

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
