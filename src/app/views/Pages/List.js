import React, { Component } from 'react';
import {
  Row, Col, Card, Empty,
} from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import MovieService from '../../_services/movie.service';
import movieAction from '../../actions/movie.action';
import EventBus from '../../_helpers/EventBus';

const { Meta } = Card;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
    this.getMovies = this.getMovies.bind(this);
    this.clickOnMovie = this.clickOnMovie.bind(this);
  }

  componentDidMount() {
    this.getMovies(this.props.page);
    EventBus.on('pageChanged', (page) => {
      if (!this.props.isSearch) {
        this.getMovies(page);
      }
    });
  }

  getMovies(requestCount) {
    this.props.clearMovies();
    this.setState({
      movies: [],
    });
    MovieService.getAllMovies(requestCount, (data) => {
      const dummy = this.state.movies.slice(0);
      dummy.push(...data.Search);
      this.props.setTotalCount(data.totalResults !== undefined ? data.totalResults : 0);
      this.setState({
        movies: dummy.slice(),
      }, () => {
        this.props.setMovies(this.state.movies);
      });
    });
  }

  clickOnMovie(imdbID) {
    this.props.history.push(`/detail/${imdbID}`);
  }

  render() {
    if (this.props.movies.length !== 0) {
      return (
        <Row gutter={[0, 20]}>
          {this.props.movies.map((movie) => (
            <Col
              lg={6}
              md={8}
              sm={12}
              xs={24}
              className="card-container"
              key={movie.imdbID}
            >
              <Card
                onClick={() => this.clickOnMovie(movie.imdbID)}
                hoverable="true"
                style={{ width: 240, textAlign: 'center' }}
                cover={<img alt={movie.Title} height="300px" src={movie.Poster} />}
              >
                <Meta title={movie.Title} description={movie.Year} />
              </Card>
            </Col>
          ))}
        </Row>
      );
    }
    return (
      <Empty description={(
        <span>
          There is no movie to show
        </span>
   )}
      />
    );
  }
}
const mapDispatchToProps = {
  setMovies: movieAction.SET_MOVIE_ACTION,
  clearMovies: movieAction.CLEAR_MOVIES_ACTION,
  setTotalCount: movieAction.SET_TOTAL_COUNT_ACTION,
};
const mapStateToProps = (state) => ({
  movies: state.movies.movies,
  page: state.movies.page,
  isSearch: state.movies.isSearch,

});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
