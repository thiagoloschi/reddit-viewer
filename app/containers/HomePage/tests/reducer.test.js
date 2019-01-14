import { fromJS } from 'immutable';
import { LIFECYCLE } from 'redux-pack';
import mockedPost from 'utils/mockedPost.json';
import { makePackAction } from 'utils/reduxPackTest';
import homeReducer, { initialState } from '../reducer';
import { FETCH_POSTS } from '../constants';

describe('HomePage reducer', () => {
  const payload = {
    kind: 'Listing',
    data: {
      children: [mockedPost],
      after: 'after',
      dist: 25,
    },
    shouldConcat: false,
  };

  it('should return the initial state', () => {
    expect(homeReducer(undefined, {})).toEqual(initialState);
  });

  describe('when FETCH_POSTS is dispatched', () => {
    describe('when the promise is started', () => {
      const fetchPostsPayloadStart = {
        type: FETCH_POSTS,
        meta: { 'redux-pack/LIFECYCLE': 'start' },
      };
      const expectedState = fromJS({
        ...initialState.toJS(),
        isLoading: true,
        error: false,
      });

      const state = homeReducer(
        undefined,
        makePackAction(LIFECYCLE.START, fetchPostsPayloadStart),
      );
      it('should return the expected state', () => {
        expect(state).toEqual(expectedState);
      });
    });

    describe('when the promise is successful', () => {
      describe('when there is no error', () => {
        const fetchPostsPayloadFinish = {
          type: FETCH_POSTS,
          payload,
          meta: { 'redux-pack/LIFECYCLE': 'success' },
        };
        const expectedState = fromJS({
          ...initialState.toJS(),
          posts: {
            children: payload.data.children,
            after: 'after',
            dist: 25,
          },
        });

        const state = homeReducer(
          undefined,
          makePackAction(LIFECYCLE.SUCCESS, fetchPostsPayloadFinish),
        );
        it('should return the expected state', () => {
          expect(state).toEqual(expectedState);
        });
      });
      describe('when there is error', () => {
        const fetchPostsPayloadFinish = {
          type: FETCH_POSTS,
          payload: { error: true },
          meta: { 'redux-pack/LIFECYCLE': 'success' },
        };
        const expectedState = fromJS({
          ...initialState.toJS(),
          posts: {
            children: [],
            after: null,
          },
          error: true,
        });

        const state = homeReducer(
          undefined,
          makePackAction(LIFECYCLE.SUCCESS, fetchPostsPayloadFinish),
        );
        it('should return the expected state', () => {
          expect(state).toEqual(expectedState);
        });
      });

      describe('when it should concat posts', () => {
        const postsAlreadyFetched = [mockedPost];
        const fetchPostsPayloadFinish = {
          type: FETCH_POSTS,
          payload: { ...payload, error: false, shouldConcat: true },
          meta: { 'redux-pack/LIFECYCLE': 'success' },
        };
        const expectedState = fromJS({
          ...initialState.toJS(),
          posts: {
            children: [mockedPost, mockedPost],
            after: 'after',
          },
          error: false,
        });

        const state = homeReducer(
          fromJS({
            ...initialState.toJS(),
            posts: {
              children: postsAlreadyFetched,
            },
          }),
          makePackAction(LIFECYCLE.SUCCESS, fetchPostsPayloadFinish),
        );
        it('should return the expected state', () => {
          expect(state).toEqual(expectedState);
        });
      });

      describe('when the dist is smaller than 25', () => {
        const postsAlreadyFetched = [mockedPost];
        const fetchPostsPayloadFinish = {
          type: FETCH_POSTS,
          payload: {
            ...payload,
            error: false,
            shouldConcat: true,
            data: { ...payload.data, dist: 2 },
          },
          meta: { 'redux-pack/LIFECYCLE': 'success' },
        };
        const expectedState = fromJS({
          ...initialState.toJS(),
          posts: {
            children: [mockedPost, mockedPost],
            after: false,
          },
          error: false,
        });

        const state = homeReducer(
          fromJS({
            ...initialState.toJS(),
            posts: {
              children: postsAlreadyFetched,
            },
          }),
          makePackAction(LIFECYCLE.SUCCESS, fetchPostsPayloadFinish),
        );
        it('should return the expected state', () => {
          expect(state).toEqual(expectedState);
        });
      });
    });
  });
});
