import React from 'react';
import PropTypes from 'prop-types';

function PostFactory({ posts }) {
  return (
    <ul>
      {posts.map(({ data: { id, title } }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );
}

PostFactory.propTypes = {
  posts: PropTypes.array,
};

export default PostFactory;
