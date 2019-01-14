import React from 'react';
import { shallow } from 'enzyme';
import { formatThousands } from 'utils/numbers';
import SearchBar from '../index';
import { Bar } from '../look';

const defaultProps = {
  score: 123872,
};
const render = () => shallow(<SearchBar {...defaultProps} />);

describe('<SearchBar />', () => {
  const { score } = defaultProps;

  const scorebar = render();
  const formattedScore = formatThousands(score);

  it('should render correctlty with the matching props', () => {
    expect(
      scorebar.containsMatchingElement(
        <Bar>
          <button type="button">+</button>
          <p>{formattedScore}</p>
          <button type="button">-</button>
        </Bar>,
      ),
    ).toBeTruthy();
  });
});
