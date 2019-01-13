import { handle } from 'redux-pack';
import { fromJS } from 'immutable';
import { FETCH_POSTS } from './constants';

export const initialState = fromJS({
  isLoading: false,
  error: false,
  posts: {
    children: [],
    after: null,
  },
});

function handleFetchPosts(prevState, { data, shouldConcat, error }) {
  if (error) {
    return prevState.mergeDeep({
      error: true,
      posts: {
        children: [],
      },
    });
  }
  const { children, after, dist } = data;
  if (shouldConcat === false) {
    return prevState.merge({
      posts: data,
    });
  }

  const posts = prevState.getIn(['posts', 'children']).toJS();
  return prevState.mergeDeep({
    posts: {
      children: posts.concat(children),
      after: dist >= 25 && after,
    },
  });
}

function homeReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_POSTS:
      return handle(state, action, {
        start: prevState =>
          prevState.mergeDeep({
            isLoading: true,
            error: false,
          }),
        finish: prevState => prevState.merge({ isLoading: false }),
        success: prevState => handleFetchPosts(prevState, payload),
      });
    default:
      return state;
  }
}

export default homeReducer;
