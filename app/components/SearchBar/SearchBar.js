import React from 'react';
import PropTypes from 'prop-types';
import { InputText } from './look';

function SearchBar({ onSubmit, onChange, placeholder, name }) {
  return (
    <form onSubmit={onSubmit}>
      <InputText
        type="text"
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      />
    </form>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
};

export default SearchBar;
