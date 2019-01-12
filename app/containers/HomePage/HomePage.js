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
    posts: PropTypes.array,
    getPosts: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.fetchNewTopic = this.fetchNewTopic.bind(this);
    this.state = {
      topics: ['hot', 'new', 'controversial', 'top', 'rising'],
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
  }

  fetchNewTopic({ target: { value } }) {
    this.props.getPosts(value);
  }

  render() {
    const {
      posts: { children },
    } = this.props;
    const { topics } = this.state;

    return (
      <>
        <TopicDropdown topics={topics} onChange={this.fetchNewTopic} />
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
    getPosts: (query, next) => dispatch(fetchPosts(query, next)),
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
