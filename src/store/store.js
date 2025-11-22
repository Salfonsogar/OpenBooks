import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import booksReducer from './booksSlice';
import reviewsReducer from './reviewsSlice';
import categoriesReducer from './categoriesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    reviews: reviewsReducer,
    categories: categoriesReducer,
  },
});

export default store;
