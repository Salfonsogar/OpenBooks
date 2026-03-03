import { createSelector } from '@reduxjs/toolkit';

const selectBooksState = (state) => state.books;
const selectLibraryState = (state) => state.library;
const selectRatingsState = (state) => state.ratings;
const selectCategoriesState = (state) => state.categories;

export const selectAllBooks = createSelector(
  [selectBooksState],
  (books) => books.items
);

export const selectCatalogBooks = createSelector(
  [selectBooksState],
  (books) => books.catalogItems
);

export const selectCatalogTotalPages = createSelector(
  [selectBooksState],
  (books) => books.catalogTotalPages
);

export const selectCatalogStatus = createSelector(
  [selectBooksState],
  (books) => books.status
);

export const selectBookStatus = createSelector(
  [selectBooksState],
  (books) => books.status
);

export const selectCurrentBook = createSelector(
  [selectBooksState],
  (books) => books.currentBook
);

export const selectBookError = createSelector(
  [selectBooksState],
  (books) => books.error
);

export const selectTopViewedBooks = createSelector(
  [selectBooksState],
  (books) => books.topViewed
);

export const selectTopRatedBooks = createSelector(
  [selectBooksState],
  (books) => books.topRated
);

export const selectAllCategories = createSelector(
  [selectCategoriesState],
  (categories) => categories.items
);

export const selectCategoriesStatus = createSelector(
  [selectCategoriesState],
  (categories) => categories.status
);

export const selectLibraryBooks = createSelector(
  [selectLibraryState],
  (library) => library.items
);

export const selectLibraryTotalPages = createSelector(
  [selectLibraryState],
  (library) => library.totalPages
);

export const selectLibraryStatus = createSelector(
  [selectLibraryState],
  (library) => library.status
);

export const selectUserRating = (libroId) => createSelector(
  [selectRatingsState],
  (ratings) => ratings.userRatings[libroId]
);

export const selectAllBooksAdmin = createSelector(
  [selectBooksState],
  (books) => books.adminItems
);
