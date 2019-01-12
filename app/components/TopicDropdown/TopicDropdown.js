import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from './look';

function TopicDropdown({ topics, onChange }) {
  return (
    <Dropdown onChange={onChange}>
      {topics &&
        topics.length > 0 &&
        topics.map(topic => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
    </Dropdown>
  );
}

TopicDropdown.propTypes = {
  topics: PropTypes.array,
  onChange: PropTypes.func,
};

export default TopicDropdown;
