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

import { fetchPosts } from './actions';
import { makeSelectPosts } from './selectors';
import reducer from './reducer';

class HomePage extends React.PureComponent {
  static propTypes = {
    posts: PropTypes.array,
    getPosts: PropTypes.func,
  };

  componentDidMount() {
    const {
      posts: { children },
      getPosts,
    } = this.props;

    if (!children || children.length <= 0) {
      getPosts();
    }
  }

  render() {
    const {
      posts: { children },
    } = this.props;

    return (
      <>
        <h1>Posts</h1>
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
