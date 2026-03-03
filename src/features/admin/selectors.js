import { createSelector } from '@reduxjs/toolkit';

const selectUsersState = (state) => state.users;
const selectDenunciasState = (state) => state.denuncias;
const selectSugerenciasState = (state) => state.sugerencias;
const selectSancionesState = (state) => state.sanciones;

export const selectAllUsers = createSelector(
  [selectUsersState],
  (users) => users.items
);

export const selectUsersStatus = createSelector(
  [selectUsersState],
  (users) => users.status
);

export const selectUsersPagination = createSelector(
  [selectUsersState],
  (users) => ({
    pagina: users.pagina,
    totalPages: users.totalPages,
    totalItems: users.totalItems
  })
);

export const selectUserCreateStatus = createSelector(
  [selectUsersState],
  (users) => users.createStatus
);

export const selectUserCreateError = createSelector(
  [selectUsersState],
  (users) => users.createError
);

export const selectUserUpdateStatus = createSelector(
  [selectUsersState],
  (users) => users.updateStatus
);

export const selectUserUpdateError = createSelector(
  [selectUsersState],
  (users) => users.updateError
);

export const selectAllDenuncias = createSelector(
  [selectDenunciasState],
  (denuncias) => denuncias.items
);

export const selectDenunciasStatus = createSelector(
  [selectDenunciasState],
  (denuncias) => denuncias.status
);

export const selectDenunciasPagination = createSelector(
  [selectDenunciasState],
  (denuncias) => ({
    pagina: denuncias.pagina,
    totalPages: denuncias.totalPages
  })
);

export const selectAllSugerencias = createSelector(
  [selectSugerenciasState],
  (sugerencias) => sugerencias.items
);

export const selectSugerenciasStatus = createSelector(
  [selectSugerenciasState],
  (sugerencias) => sugerencias.status
);

export const selectSugerenciasCreateStatus = createSelector(
  [selectSugerenciasState],
  (sugerencias) => sugerencias.createStatus
);

export const selectSugerenciasCreateError = createSelector(
  [selectSugerenciasState],
  (sugerencias) => sugerencias.createError
);

export const selectAllSanciones = createSelector(
  [selectSancionesState],
  (sanciones) => sanciones.items
);

export const selectSancionesCreateStatus = createSelector(
  [selectSancionesState],
  (sanciones) => sanciones.createStatus
);
