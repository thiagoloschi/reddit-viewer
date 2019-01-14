import { fromJS } from 'immutable';
import {
  selectHome,
  makeSelectPosts,
  makeSelectError,
  makeSelectIsLoading,
} from '../selectors';

describe('HomePage selectors', () => {
  const home = fromJS({
    posts: {
      children: [{ title: 'my cool post' }],
      error: false,
      isLoading: false,
    },
  });

  describe('selectHome', () => {
    const mockState = fromJS({ home });
    it('should select home from state', () => {
      expect(selectHome(mockState)).toEqual(home);
    });
  });

  describe('makeSelectPosts', () => {
    const mockState = fromJS({ home });
    const expected = home.get('posts').toJS();
    it('should select posts from state', () => {
      expect(makeSelectPosts()(mockState)).toEqual(expected);
    });
  });

  describe('makeSelectError', () => {
    const mockState = fromJS({ home });
    const expected = home.get('error');
    it('should select posts from state', () => {
      expect(makeSelectError()(mockState)).toEqual(expected);
    });
  });

  describe('makeSelectIsLoading', () => {
    const mockState = fromJS({ home });
    const expected = home.get('error');
    it('should select posts from state', () => {
      expect(makeSelectIsLoading()(mockState)).toEqual(expected);
    });
  });
});
