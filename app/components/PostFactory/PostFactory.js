import React from 'react';
import PropTypes from 'prop-types';
import PostCard from 'components/PostCard';
import { List } from './look';

function PostFactory({ posts }) {
  return (
    <List>
      {posts.map(({ data }) => (
        <li key={data.id}>
          <PostCard data={data} />
        </li>
      ))}
    </List>
  );
}

PostFactory.propTypes = {
  posts: PropTypes.array,
};

export default PostFactory;
