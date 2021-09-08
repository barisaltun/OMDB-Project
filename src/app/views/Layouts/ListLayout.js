import React, { Component } from 'react';
import { Layout, Pagination, Empty } from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import List from '../Pages/List';
import SearchBox from '../Components/Search';
import movieAction from '../../actions/movie.action';
import EventBus from '../../_helpers/EventBus';

const { Header, Footer, Content } = Layout;

class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(page) {
    this.setState(
      {
        currentPage: page,
      },
      () => {
        this.props.setPage(this.state.currentPage);
        EventBus.emit('pageChanged', this.state.currentPage);
      },
    );
  }

  render() {
    return (
      <Layout>
        <Header>
          <SearchBox />
        </Header>
        <Content>
          <List />
        </Content>
        <Footer>
          {this.props.movies.length !== 0 ? (
            <Pagination
              pageSize={20}
              current={this.props.page}
              total={this.props.totalCount}
              showSizeChanger={false}
              onChange={this.onChange}
              showLessItems
            />
          ) : ('')}
        </Footer>
      </Layout>
    );
  }
}
const mapDispatchToProps = {
  setPage: movieAction.SET_PAGE_ACTION,
};
const mapStateToProps = (state) => ({
  totalCount: state.movies.totalCount,
  page: state.movies.page,
  movies: state.movies.movies,
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppLayout));
