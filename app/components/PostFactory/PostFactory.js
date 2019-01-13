import React from 'react';
import PropTypes from 'prop-types';
import PostCard from 'components/PostCard';
import { List } from './look';

function PostFactory({ posts, error, isLoading }) {
  if (posts.length === 0 && isLoading) {
    return <li>Loading...</li>;
  }

  if (error || posts.length === 0) {
    return <li>Nothing found!</li>;
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
