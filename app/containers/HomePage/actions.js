import * as reddit from 'services/reddit';
import { FETCH_POSTS } from './constants';

export function fetchPosts(query, next) {
  return {
    type: FETCH_POSTS,
    promise: reddit.fetchPosts(query, next),
  };
}
