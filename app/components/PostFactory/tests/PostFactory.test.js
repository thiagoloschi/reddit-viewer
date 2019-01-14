import React from 'react';
import { shallow } from 'enzyme';
import mockedPost from 'utils/mockedPost.json';
import PostCard from 'components/PostCard';
import PostFactory from '../index';
import { List, Feedback } from '../look';

const posts = [mockedPost, mockedPost];

const render = props => shallow(<PostFactory {...props} />);

describe('<PostFactory />', () => {
  describe('when there are posts', () => {
    const withPosts = render({ posts, isLoading: true });

    it('should render a list of posts', () => {
      expect(
        withPosts.containsMatchingElement(
          <List>
            {posts.map(({ data }) => (
              <li key={data.id}>
                <PostCard data={data} isLoading />
              </li>
            ))}
          </List>,
        ),
      ).toBeTruthy();
    });

    describe('and there is an error', () => {
      const withError = render({ posts, error: true });

      it('should render an error message', () => {
        expect(
          withError.containsMatchingElement(
            <Feedback>Nothing found!</Feedback>,
          ),
        ).toBeTruthy();
      });
    });
  });

  describe('when there are no posts', () => {
    describe('and there is no error', () => {
      const withoutPosts = render({ posts: [], error: false });

      it('should render an is empty message', () => {
        expect(
          withoutPosts.containsMatchingElement(
            <Feedback>Nothing found!</Feedback>,
          ),
        ).toBeTruthy();
      });
    });
  });

  describe('when it is loading', () => {
    const isLoading = render({ posts: [], isLoading: true });
    it('should render a loading message', () => {
      expect(
        isLoading.containsMatchingElement(<Feedback>loading...</Feedback>),
      ).toBeTruthy();
    });
  });
});
