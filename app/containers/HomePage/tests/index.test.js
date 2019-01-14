import React from 'react';
import { shallow } from 'enzyme';
import Posts from 'components/PostFactory';
import FiltersDropdown from 'components/FiltersDropdown';
import SearchBar from 'components/SearchBar';
import mockedPost from 'utils/mockedPost.json';

import { HomePage, mapDispatchToProps } from '../HomePage';
import { NavigationBar, FilterSection, Heading } from '../look';

import { fetchPosts } from '../actions';

jest.mock('services/reddit');

const defaultProps = {
  error: false,
  isLoading: false,
  getPosts: jest.fn(),
  posts: {
    after: 'after',
    children: [mockedPost],
  },
};

const defaultState = {
  filters: ['hot', 'new', 'controversial', 'top', 'rising'],
  selectedFilter: 'hot',
  topic: 'all',
};

const render = props => shallow(<HomePage {...defaultProps} {...props} />);

describe('<HomePage />', () => {
  const { getPosts } = defaultProps;

  describe('componentDidMount', () => {
    describe('when there is no error and no posts', () => {
      const withNoErrorAndNoPosts = render({ posts: [], error: false });
      it('should call getPosts when the component mounts', () => {
        withNoErrorAndNoPosts.instance().componentDidMount();
        expect(getPosts).toHaveBeenCalled();
      });
    });

    it('should add a listener to onsroll', () => {
      const withListener = render({ posts: [mockedPost, mockedPost] });
      window.addEventListener = jest.fn();
      withListener.instance().componentDidMount();
      const callback = withListener.instance().fetchMorePosts;
      expect(window.addEventListener).toHaveBeenCalledWith('scroll', callback);
    });
  });

  describe('componentWillUnmount', () => {
    it('should remove the listener to onsroll', () => {
      const withoutListener = render({ posts: [mockedPost] });
      window.removeEventListener = jest.fn();
      withoutListener.instance().componentWillUnmount();
      const callback = withoutListener.instance().fetchMorePosts;
      expect(window.addEventListener).toHaveBeenCalledWith('scroll', callback);
    });
  });

  describe('lookForATopic', () => {
    const homePage = render();
    const event = {
      preventDefault: jest.fn(),
    };
    homePage.instance().state.topic = 'notEmpty';
    homePage.instance().state.selectedFilter = 'someFilter';
    homePage.instance().lookForATopic(event);
    it('should call event.preventdefault', () => {
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should call getPosts if topic is not empty', () => {
      expect(getPosts).toHaveBeenCalledWith('notEmpty', 'someFilter');
    });
  });

  describe('updateTopic', () => {
    it('should update the state with the right value', () => {
      const homePage = render();
      const event = { target: { value: 'newValue' } };
      homePage.instance().updateTopic(event);
      expect(homePage.instance().state.topic).toEqual('newValue');
    });
  });

  describe('fetchWithFilter', () => {
    const homePage = render();
    const event = { target: { value: 'someFilter' } };
    homePage.instance().state.topic = 'notEmpty';
    homePage.instance().fetchWithFilter(event);

    it('should update the stat with the selected filter', () => {
      expect(homePage.instance().state.selectedFilter).toEqual('someFilter');
    });

    it('should call getPosts if topic is not empty', () => {
      expect(getPosts).toHaveBeenCalledWith('notEmpty', 'someFilter');
    });
  });

  describe('fetchMorePosts', () => {
    const homePage = render();
    homePage.instance().state.topic = 'notEmpty';
    homePage.instance().state.selectedFilter = 'selectedFilter';
    const { scrollHeight } = document.documentElement;
    homePage.simulate('scroll', { deltaY: scrollHeight });

    describe('when there are more posts and it is the bottom of the page', () => {
      it('should call getPosts if topic is not empty', () => {
        expect(getPosts).toHaveBeenCalledWith('notEmpty', 'someFilter');
      });
    });
  });

  describe('render', () => {
    const homePage = render();
    const {
      posts: { children },
      error,
      isLoading,
    } = defaultProps;
    const { filters, selectedFilter, topic } = defaultState;
    const { lookForATopic, updateTopic, fetchWithFilter } = homePage.instance();
    it('should render correctly with the matching props', () => {
      expect(
        homePage.containsMatchingElement(
          <>
            <NavigationBar>
              <Heading>{`r/${topic}`}</Heading>
              <FilterSection>
                <SearchBar
                  name="search"
                  onSubmit={lookForATopic}
                  onChange={updateTopic}
                  placeholder="look for a topic"
                />
                <FiltersDropdown
                  selectedFilter={selectedFilter}
                  filters={filters}
                  onChange={fetchWithFilter}
                />
              </FilterSection>
            </NavigationBar>
            <Posts error={error} isLoading={isLoading} posts={children} />
          </>,
        ),
      ).toEqual(true);
      expect(homePage).toMatchSnapshot();
    });
  });

  describe('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);

    describe('dispatchProps', () => {
      it('should have dispatchProps defined', () => {
        expect(dispatchProps.getPosts).toBeDefined();
      });
    });

    describe('getPosts', () => {
      it('should dispatch fetchPosts correctly', () => {
        dispatchProps.getPosts();
        expect(dispatch).toHaveBeenCalledWith(fetchPosts());
      });
    });
  });
});
