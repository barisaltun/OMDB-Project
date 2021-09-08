import axios from 'axios';
import { API, REQUEST_COUNT } from '../_helpers/env';

function getAllMovies(pagination, callback) {
  const pageNumbers = pagination * REQUEST_COUNT;
  for (let i = pageNumbers - REQUEST_COUNT + 1; i <= pageNumbers; i++) {
    axios.get(`${API}&s=bat&page=${i}`).then((result) => { // bat keyword selected because of the result count for listing page
      callback(result.data);
    }).catch((err) => err);
  }
}
function getMoviesByTitle(search, pagination, callback) {
  const pageNumbers = pagination * REQUEST_COUNT;
  for (let i = pageNumbers - REQUEST_COUNT + 1; i <= pageNumbers; i++) {
    axios.get(`${API}&s=${search}&page=${i}`).then((result) => {
      callback(result.data);
    }).catch((err) => err);
  }
}

function getMovieById(id, callback) {
  axios.get(`${API}&i=${id}`).then((result) => {
    callback(result.data);
  }).catch((err) => err);
}

const MovieService = {
  getAllMovies,
  getMovieById,
  getMoviesByTitle,
};

export default MovieService;
