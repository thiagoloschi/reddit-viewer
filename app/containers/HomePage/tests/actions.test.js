import { fetchPosts as getPosts } from 'services/reddit';
import { fetchPosts } from '../actions';
import { FETCH_POSTS } from '../constants';

jest.mock('services/reddit');

describe('HomePage actions', () => {
  beforeAll(() => {
    getPosts.mockReturnValue(Promise.resolve());
  });

  describe('fetchPosts', () => {
    it('should have a type of FETCH_POSTS', () => {
      expect(fetchPosts('topic', 'sort', 'after').type).toEqual(FETCH_POSTS);
    });
    it('should fetch reddit api', () => {
      expect(getPosts).toBeCalledWith('topic', 'sort', 'after');
    });
  });
});
