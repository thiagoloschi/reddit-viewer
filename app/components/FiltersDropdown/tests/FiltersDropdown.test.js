import React from 'react';
import { shallow } from 'enzyme';
import FiltersDropdown from '../index';
import { Dropdown } from '../look';

const defaultProps = {
  onChange: jest.fn(),
};
const render = props =>
  shallow(<FiltersDropdown {...defaultProps} {...props} />);

describe('<FiltersDropdown />', () => {
  const { onChange } = defaultProps;
  describe('when there are no filters', () => {
    const withoutFilters = render({ filters: [] });

    it('should render a list of posts', () => {
      expect(
        withoutFilters.containsMatchingElement(
          <Dropdown onChange={onChange}>
            <option> - </option>
          </Dropdown>,
        ),
      ).toBeTruthy();
    });
  });

  describe('when there are filters', () => {
    const filters = ['option1', 'option2'];
    const selectedFilter = filters[1];
    const withFilters = render({ filters, selectedFilter });

    it('should render a list of options', () => {
      expect(
        withFilters.containsMatchingElement(
          <Dropdown onChange={onChange}>
            <option key={filters[0]} value={filters[0]} defaultValue={false}>
              {filters[0]}
            </option>
            <option key={filters[1]} value={filters[1]} defaultValue>
              {filters[1]}
            </option>
          </Dropdown>,
        ),
      ).toBeTruthy();
    });
  });
});
