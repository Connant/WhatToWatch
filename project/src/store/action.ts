import { Film, FilmProps } from '../components/film-card/film-card';
import { AuthorizationStatus } from '../const';
import { ReviewPost } from '../components/add-review/add-review-form';
import { createAction } from '@reduxjs/toolkit';

export enum ActionType {
  ChangeGenre = 'films/changeGenre',
  FilterFilms = 'films/filterFilms',
  LoadFilms = 'data/loadFilms',
  LoadFilm = 'data/loadFilm',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  LoadSimilarFilms = 'data/loadSimilarFilms',
  LoadReviews = 'data/loadReviews',
  RedirectToRoute = 'app/redirect',
  LoadFavorite = 'user/loadFavorite',
  AddFavorite = 'user/addFavorite',
  RemoveFavorite = 'user/removeFavorite',
  LoadPromo = 'data/loadPromo',
  UpdatePromo = 'user/updatePromo',
  UpdateFilm = 'user/updateFilm'
}

export type Actions =
| ReturnType<typeof changeGenre>
| ReturnType<typeof filterFilms>
| ReturnType<typeof loadFilms>
| ReturnType<typeof loadFilm>
| ReturnType<typeof requireAuthorization>
| ReturnType<typeof requireLogout>
| ReturnType<typeof loadSimilarFilms>
| ReturnType<typeof loadReviews>
| ReturnType<typeof addFavorite>
| ReturnType<typeof removeFavorite>
| ReturnType<typeof loadFavorite>
| ReturnType<typeof redirectToRoute>
| ReturnType<typeof loadPromo>
| ReturnType<typeof updatePromo>
| ReturnType<typeof updateFilm>

export type ChangeGenreAction = {
  type: ActionType.ChangeGenre,
  payload: string,
}

export const changeGenre = (genre: string): ChangeGenreAction => ({
  type: ActionType.ChangeGenre,
  payload: genre,
});

export const filterFilms = createAction(
  ActionType.FilterFilms,
  (films: Film[]) => ({payload: films}),
);

export const loadFilms = createAction(
  ActionType.LoadFilms,
  (films: FilmProps[]) => ({payload: films}),
);

export const loadFilm = createAction(
  ActionType.LoadFilm,
  (film: FilmProps) => ({payload: film}),
);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({payload: authStatus}),
);

export const requireLogout = createAction(ActionType.RequireLogout);

export const loadSimilarFilms = createAction(
  ActionType.LoadSimilarFilms,
  (films: FilmProps[]) => ({payload: films}),
);

export const loadReviews = createAction(
  ActionType.LoadReviews,
  (reviews: ReviewPost[]) => ({payload: reviews}),
);

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: string) => ({payload: url}),
);

export const loadFavorite = createAction(
  ActionType.LoadFavorite,
  (films: FilmProps[]) => ({payload: films}),
);

export const addFavorite = createAction(
  ActionType.AddFavorite,
  (films: FilmProps[]) => ({payload: films}),
);

export const removeFavorite = createAction(ActionType.RemoveFavorite);

export const loadPromo = createAction(
  ActionType.LoadPromo,
  (promo: Film) => ({payload: promo}),
);

export const updatePromo = createAction(
  ActionType.UpdatePromo,
  (film: Film) => ({payload: film}),
);

export const updateFilm = createAction(
  ActionType.UpdateFilm,
  (film: Film) => ({payload: film}),
);
