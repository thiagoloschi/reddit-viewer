import { handle } from 'redux-pack';
import { fromJS } from 'immutable';
import { FETCH_POSTS } from './constants';

export const initialState = fromJS({
  isLoading: false,
  error: null,
  posts: {
    children: [],
    after: null,
  },
});

function handleFetchPostsSuccess(prevState, { data, shouldConcat }) {
  const { children, after } = data;
  if (shouldConcat === false) {
    return prevState.merge({
      posts: data,
    });
  }
  const posts = prevState.getIn(['posts', 'children']).toJS();
  return prevState.mergeDeep({
    posts: {
      children: posts.concat(children),
      after,
    },
  });
}

function homeReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_POSTS:
      return handle(state, action, {
        start: prevState => prevState.merge({ isLoading: true }),
        finish: prevState => prevState.merge({ isLoading: false }),
        failure: prevState => prevState.merge({ error: payload }),
        success: prevState => handleFetchPostsSuccess(prevState, payload),
      });
    default:
      return state;
  }
}

export default homeReducer;
