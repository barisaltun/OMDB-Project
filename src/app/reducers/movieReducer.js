import movieTypes from '../types/movie.types';

const initialState = {
  movies: [],
  initialMovies: [],
  selectedMovie: {},
  totalCount: 0,
  page: 1,
  isSearch: false,
};

export default function MOVIE_REDUCER(state = initialState, { type, payload }) {
  let tempMovies = [];
  switch (type) {
    case movieTypes.SET_MOVIES:
      tempMovies = [];
      tempMovies.push(...payload.movies);
      return {
        ...state,
        movies: tempMovies.slice(),
      };
    case movieTypes.CLEAR_MOVIES:
      return {
        ...state,
        movies: [],
      };
    case movieTypes.SELECT_MOVIE:
      return {
        ...state,
        selectedMovie: payload.selectedMovie.slice(),
      };
    case movieTypes.SET_TOTAL:
      return {
        ...state,
        totalCount: payload.totalCount,
      };
    case movieTypes.SET_PAGE:
      return {
        ...state,
        page: payload.page,
      };
    case movieTypes.SEARCH:
      return {
        ...state,
        isSearch: payload.isSearch,
      };
    default:
      return state;
  }
}
