import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('home', initialState);

const makeSelectPosts = () =>
  createSelector(selectHome, homeState => homeState.get('posts').toJS());

const makeSelectError = () =>
  createSelector(selectHome, homeState => homeState.get('error'));

const makeSelectIsLoading = () =>
  createSelector(selectHome, homeState => homeState.get('isLoading'));

export { selectHome, makeSelectPosts, makeSelectError, makeSelectIsLoading };
