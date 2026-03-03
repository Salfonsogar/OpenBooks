import { createSelector } from '@reduxjs/toolkit';

const selectAuthState = (state) => state.auth;
const selectRolesState = (state) => state.roles;

export const selectAuthUser = createSelector(
  [selectAuthState],
  (auth) => auth.user
);

export const selectAuthToken = createSelector(
  [selectAuthState],
  (auth) => auth.token
);

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => !!auth.token
);

export const selectAuthStatus = createSelector(
  [selectAuthState],
  (auth) => auth.status
);

export const selectAuthError = createSelector(
  [selectAuthState],
  (auth) => auth.error
);

export const selectAllRoles = createSelector(
  [selectRolesState],
  (roles) => roles.items
);

export const selectRolesStatus = createSelector(
  [selectRolesState],
  (roles) => roles.status
);
