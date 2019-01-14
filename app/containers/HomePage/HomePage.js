/* 
  Following exception is added in order to make hot reloading possible as it doesn't support stateless functional
  components
*/
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';

import Posts from 'components/PostFactory';
import FiltersDropdown from 'components/FiltersDropdown';
import SearchBar from 'components/SearchBar';
import {
  NavigationBar,
  FilterSection,
  Heading,
  Viewport,
  ViewFrame,
} from './look';

import { fetchPosts } from './actions';
import {
  makeSelectPosts,
  makeSelectError,
  makeSelectIsLoading,
} from './selectors';
import reducer from './reducer';

export class HomePage extends React.PureComponent {
  static propTypes = {
    posts: PropTypes.object,
    getPosts: PropTypes.func,
    error: PropTypes.bool,
    isLoading: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.lookForATopic = this.lookForATopic.bind(this);
    this.updateTopic = this.updateTopic.bind(this);
    this.fetchWithFilter = this.fetchWithFilter.bind(this);
    this.fetchMorePosts = this.fetchMorePosts.bind(this);
    this.state = {
      filters: ['hot', 'new', 'controversial', 'top', 'rising'],
      selectedFilter: 'hot',
      topic: 'all',
      currentUrl: 'https://www.usatoday.com/story/opinion/2019/01/13/mounting-evidence-trump-fears-putin-compromising-information-column/2564892002/',
    };
  }

  componentDidMount() {
    const {
      posts: { children },
      error,
      getPosts,
    } = this.props;
    const thereAreNoPosts = !children || children.length === 0;

    if (error === false && thereAreNoPosts) {
      getPosts();
    }

    window.addEventListener('scroll', this.fetchMorePosts);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fetchMorePosts);
  }

  lookForATopic(event) {
    event.preventDefault();
    const { getPosts } = this.props;
    const { topic, selectedFilter } = this.state;

    if (topic !== '') {
      getPosts(topic, selectedFilter);
    }
  }

  updateTopic({ target: { value } }) {
    this.setState({
      topic: value,
    });
  }

  fetchWithFilter({ target: { value } }) {
    const { topic } = this.state;
    const { getPosts } = this.props;

    this.setState({
      selectedFilter: value,
    });

    if (topic !== '') {
      getPosts(topic, value);
    }
  }

  fetchMorePosts() {
    const {
      posts: { after },
      getPosts,
    } = this.props;
    const { topic, selectedFilter } = this.state;
    const { scrollTop, scrollHeight, offsetHeight } = document.documentElement;
    const reachedTheBottom = scrollTop + offsetHeight === scrollHeight;
    const thereAreMorePostsToFetch = after;

    if (reachedTheBottom && thereAreMorePostsToFetch) {
      getPosts(topic, selectedFilter, after);
    }
  }

  render() {
    const {
      posts: { children },
      error,
      isLoading,
    } = this.props;
    const { filters, selectedFilter, topic, currentUrl } = this.state;

    return (
      <>
        <NavigationBar>
          <Heading>{`r/${topic}`}</Heading>
          <FilterSection>
            <SearchBar
              name="search"
              onSubmit={this.lookForATopic}
              onChange={this.updateTopic}
              placeholder="look for a topic"
            />
            <FiltersDropdown
              selectedFilter={selectedFilter}
              filters={filters}
              onChange={this.fetchWithFilter}
            />
          </FilterSection>
        </NavigationBar>
        <Viewport>
          <Posts error={error} isLoading={isLoading} posts={children} />
          <ViewFrame title="viewer" src={currentUrl} />
        </Viewport>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  posts: makeSelectPosts(),
  error: makeSelectError(),
  isLoading: makeSelectIsLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getPosts: (topic, sort, after) => dispatch(fetchPosts(topic, sort, after)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });

export default compose(
  withReducer,
  withConnect,
)(HomePage);
