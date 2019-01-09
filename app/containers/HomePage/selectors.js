import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('home', initialState);

const makeSelectPosts = () =>
  createSelector(selectHome, homeState => homeState.get('posts'));

export { selectHome, makeSelectPosts };
