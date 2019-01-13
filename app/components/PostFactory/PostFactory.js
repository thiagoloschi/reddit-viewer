import React from 'react';
import PropTypes from 'prop-types';
import PostCard from 'components/PostCard';
import { List, Feedback } from './look';

function PostFactory({ posts, error, isLoading }) {
  if (posts.length === 0 && isLoading) {
    return <Feedback>loading...</Feedback>;
  }

  if (error || posts.length === 0) {
    return <Feedback>Nothing found!</Feedback>;
  }

  return (
    <List>
      {posts.map(({ data }) => (
        <li key={data.id}>
          <PostCard data={data} isLoading={isLoading} />
        </li>
      ))}
    </List>
  );
}

PostFactory.propTypes = {
  posts: PropTypes.array,
  error: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default PostFactory;
