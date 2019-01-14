import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from './look';

function FiltersDropdown({ filters, selectedFilter, onChange }) {
  if (!filters || filters.length <= 0) {
    return (
      <Dropdown onChange={onChange}>
        <option> - </option>
      </Dropdown>
    );
  }

  return (
    <Dropdown onChange={onChange}>
      {filters.map(topic => (
        <option
          key={topic}
          value={topic}
          defaultValue={topic === selectedFilter}
        >
          {topic}
        </option>
      ))}
    </Dropdown>
  );
}

FiltersDropdown.propTypes = {
  filters: PropTypes.array,
  selectedFilter: PropTypes.string,
  onChange: PropTypes.func,
};

export default FiltersDropdown;
