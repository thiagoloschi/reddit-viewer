import * as reddit from 'services/reddit';
import { FETCH_POSTS } from './constants';

export function fetchPosts(topic, sort, after) {
  return {
    type: FETCH_POSTS,
    promise: reddit.fetchPosts(topic, sort, after),
  };
}
