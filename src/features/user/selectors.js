import { createSelector } from '@reduxjs/toolkit';

export const selectAuthUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => !!state.auth.token;
