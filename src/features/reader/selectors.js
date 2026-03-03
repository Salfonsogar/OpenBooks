import { createSelector } from '@reduxjs/toolkit';

const selectReaderState = (state) => state.reader;

export const selectReaderBookId = createSelector(
  [selectReaderState],
  (reader) => reader.bookId
);

export const selectReaderManifest = createSelector(
  [selectReaderState],
  (reader) => reader.manifest
);

export const selectCurrentIndex = createSelector(
  [selectReaderState],
  (reader) => reader.currentIndex
);

export const selectCurrentContent = createSelector(
  [selectReaderState],
  (reader) => reader.currentContent
);

export const selectHasNext = createSelector(
  [selectReaderState],
  (reader) => reader.currentIndex < reader.totalPages - 1
);

export const selectHasPrevious = createSelector(
  [selectReaderState],
  (reader) => reader.currentIndex > 0
);

export const selectReaderStatus = createSelector(
  [selectReaderState],
  (reader) => reader.status
);

export const selectReaderError = createSelector(
  [selectReaderState],
  (reader) => reader.error
);

export const selectReaderTheme = createSelector(
  [selectReaderState],
  (reader) => reader.theme
);

export const selectReaderFontSize = createSelector(
  [selectReaderState],
  (reader) => reader.fontSize
);

export const selectReaderFontFamily = createSelector(
  [selectReaderState],
  (reader) => reader.fontFamily
);

export const selectBookmarks = createSelector(
  [selectReaderState],
  (reader) => reader.bookmarks
);

export const selectHighlights = createSelector(
  [selectReaderState],
  (reader) => reader.highlights
);
