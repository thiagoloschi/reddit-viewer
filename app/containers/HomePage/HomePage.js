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
import TopicDropdown from 'components/TopicDropdown';

import { fetchPosts } from './actions';
import { makeSelectPosts } from './selectors';
import reducer from './reducer';

class HomePage extends React.PureComponent {
  static propTypes = {
    posts: PropTypes.object,
    getPosts: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.fetchNewTopic = this.fetchNewTopic.bind(this);
    this.fetchMorePosts = this.fetchMorePosts.bind(this);
    this.state = {
      topics: ['hot', 'new', 'controversial', 'top', 'rising'],
      selectedTopic: 'hot',
    };
  }

  componentDidMount() {
    const {
      posts: { children },
      getPosts,
    } = this.props;

    if (!children || children.length <= 0) {
      getPosts();
    }

    window.addEventListener('scroll', this.fetchMorePosts);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fetchMorePosts);
  }

  fetchNewTopic({ target: { value } }) {
    this.props.getPosts(value);

    this.setState({
      selectedTopic: value,
    });
  }

  fetchMorePosts() {
    const {
      posts: { after },
      getPosts,
    } = this.props;
    const { selectedTopic } = this.state;
    const { scrollTop, scrollHeight, offsetHeight } = document.documentElement;
    if (scrollTop + offsetHeight === scrollHeight) {
      getPosts(selectedTopic, after);
    }
  }

  render() {
    const {
      posts: { children },
    } = this.props;
    const { topics, selectedTopic } = this.state;

    return (
      <>
        <TopicDropdown
          selectedTopic={selectedTopic}
          topics={topics}
          onChange={this.fetchNewTopic}
        />
        {children && children.length > 0 && <Posts posts={children} />}
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  posts: makeSelectPosts(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getPosts: (query, after) => dispatch(fetchPosts(query, after)),
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
