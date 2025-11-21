import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import booksReducer from './booksSlice';
import reviewsReducer from './reviewsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    reviews: reviewsReducer,
  },
});

export default store;
