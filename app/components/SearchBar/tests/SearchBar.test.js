import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from '../index';
import { InputText } from '../look';

const defaultProps = {
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  placeholder: 'look for something',
  name: 'nice name',
};
const render = () => shallow(<SearchBar {...defaultProps} />);

describe('<SearchBar />', () => {
  const { onSubmit, onChange, placeholder, name } = defaultProps;

  const searchbar = render();

  it('should render correctlty with the matching props', () => {
    expect(
      searchbar.containsMatchingElement(
        <form onSubmit={onSubmit}>
          <InputText
            type="text"
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="off"
          />
        </form>,
      ),
    ).toBeTruthy();
  });
});
