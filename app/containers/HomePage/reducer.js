import { handle } from 'redux-pack';
import { fromJS } from 'immutable';
import { FETCH_POSTS } from './constants';

export const initialState = fromJS({
  isLoading: false,
  error: null,
  posts: [],
});

function homeReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_POSTS:
      return handle(state, action, {
        start: prevState => prevState.merge({ isLoading: true }),
        finish: prevState => prevState.merge({ isLoading: false }),
        failure: prevState => prevState.merge({ error: payload }),
        success: prevState => prevState.merge({ posts: payload.data }),
      });
    default:
      return state;
  }
}

export default homeReducer;
