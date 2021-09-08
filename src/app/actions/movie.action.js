import movieTypes from '../types/movie.types';

function SET_MOVIE_ACTION(movies) {
  return {
    type: movieTypes.SET_MOVIES,
    payload: {
      movies,
    },
  };
}

function SELECT_MOVIE_ACTION(selectedMovie) {
  return {
    type: movieTypes.SELECT_MOVIE,
    payload: {
      selectedMovie,
    },
  };
}

function SET_TOTAL_COUNT_ACTION(totalCount) {
  return {
    type: movieTypes.SET_TOTAL,
    payload: {
      totalCount,
    },
  };
}
function SET_PAGE_ACTION(page) {
  return {
    type: movieTypes.SET_PAGE,
    payload: {
      page,
    },
  };
}

function CLEAR_MOVIES_ACTION() {
  return {
    type: movieTypes.CLEAR_MOVIES,
  };
}

function SEARCH_ACTION(isSearch) {
  return {
    type: movieTypes.SEARCH,
    payload: {
      isSearch,
    },
  };
}

const movieAction = {
  SET_MOVIE_ACTION,
  SELECT_MOVIE_ACTION,
  CLEAR_MOVIES_ACTION,
  SET_TOTAL_COUNT_ACTION,
  SET_PAGE_ACTION,
  SEARCH_ACTION,
};

export default movieAction;
