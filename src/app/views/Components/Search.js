import React, { Component } from 'react';
import helperFunctions from "../../_helpers/helperFunctions"
import { Col, Input, Row } from 'antd';
import MovieService from "../../_services/movie.service"
import movieAction from '../../actions/movie.action';
import { connect } from 'react-redux';
import EventBus from '../../_helpers/EventBus';

const { Search } = Input;

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
			movies:[],
			keyword:""
		};
		this.onSearch = this.onSearch.bind(this);
		this.searchKeyword = this.searchKeyword.bind(this);
  }

	componentDidMount(){
		EventBus.on('pageChanged', (page) => {
      if (this.props.isSearch) {
        this.searchKeyword(this.state.keyword, page);
      }
    });
	}

	searchKeyword = helperFunctions.debounce((keyword, page)=> {
		this.setState({
			movies:[],
			keyword
		});
		if (keyword !== "") {
			this.props.setSearch(true);
			this.props.clearMovies();
			MovieService.getMoviesByTitle(keyword, page, (data)=>{
				const dummy = this.state.movies.slice(0);
				dummy.push(...data.Search);
				this.props.setTotalCount(data.totalResults !== undefined ? parseInt(data.totalResults) : 0);
				this.setState({
					movies: dummy.slice(),
				}, () => {
					this.props.setMovies(this.state.movies);
				});
			});
		}else{
			this.props.setSearch(false);
			this.props.clearMovies();
			MovieService.getAllMovies(1, (data)=>{
				const dummy = this.state.movies.slice(0);
				dummy.push(...data.Search);
				this.props.setTotalCount(data.totalResults !== undefined ? parseInt(data.totalResults) : 0);
				this.setState({
					movies: dummy.slice(),
				}, () => {
					this.props.setMovies(this.state.movies);
				});
			});
		}
	
	},300);

  onSearch(e) {
		this.props.setPage(1);
		this.searchKeyword(e.target.value,1);
	}

  render() {
    return (
      <Row>
        <Col>
          <Search placeholder="Search Movie" onChange={this.onSearch} onSearch={this.onSearch} style={{ width: 200 }} />
        </Col>
      </Row>
    );
  }
}
const mapDispatchToProps = {
  setMovies: movieAction.SET_MOVIE_ACTION,
  clearMovies: movieAction.CLEAR_MOVIES_ACTION,
	setTotalCount: movieAction.SET_TOTAL_COUNT_ACTION,
	setPage: movieAction.SET_PAGE_ACTION,
	setSearch: movieAction.SEARCH_ACTION
};
const mapStateToProps = (state) => ({
  isSearch: state.movies.isSearch,
	page:state.movies.page
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
