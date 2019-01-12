import * as reddit from 'services/reddit';
import { FETCH_POSTS } from './constants';

export function fetchPosts(query, after) {
  return {
    type: FETCH_POSTS,
    promise: reddit.fetchPosts(query, after),
  };
}
