import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {
  Col, Image, Row, Card, Descriptions,
} from 'antd';
import MovieService from '../../_services/movie.service';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetail: {},
    };
    this.getMovieDetail = this.getMovieDetail.bind(this);
  }

  componentDidMount() {
    this.getMovieDetail();
  }

  getMovieDetail() {
    MovieService.getMovieById(this.props.match.params.imdbId, (data) => {
      this.setState({
        movieDetail: data,
      });
    });
  }

  render() {
    return (
      <Row gutter={[20, 20]}>
        <Col
          lg={8}
          md={8}
          sm={12}
          xs={24}
          className="image-container"
        >
          <Image
            src={this.state.movieDetail.Poster}
            preview={false}
            alt={movieDetail.Title}
          />
        </Col>
        <Col
          lg={16}
          md={16}
          sm={12}
          xs={24}
          className="description-container"
        >
          <Card title={this.state.movieDetail.Title} bordered={false} style={{ width: 'fit' }}>
            <Descriptions>
              <Descriptions.Item labelStyle={{ fontWeight: 'bolder' }} label="Year">{this.state.movieDetail.Year}</Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item labelStyle={{ fontWeight: 'bolder' }} label="Runtime">{this.state.movieDetail.Runtime}</Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item labelStyle={{ fontWeight: 'bolder' }} label="Director">
                {this.state.movieDetail.Director}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item labelStyle={{ fontWeight: 'bolder' }} label="Actors">{this.state.movieDetail.Actors}</Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item labelStyle={{ fontWeight: 'bolder' }} label="Awards">{this.state.movieDetail.Awards}</Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item labelStyle={{ fontWeight: 'bolder' }} label="IMDB Rating">
                {this.state.movieDetail.imdbRating}
              </Descriptions.Item>
            </Descriptions>

          </Card>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Detail);
