import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from './look';

function TopicDropdown({ topics, selectedTopic, onChange }) {
  return (
    <Dropdown onChange={onChange}>
      {topics &&
        topics.length > 0 &&
        topics.map(topic => (
          <option
            key={topic}
            value={topic}
            defaultValue={topic === selectedTopic}
          >
            {topic}
          </option>
        ))}
    </Dropdown>
  );
}

TopicDropdown.propTypes = {
  topics: PropTypes.array,
  selectedTopic: PropTypes.string,
  onChange: PropTypes.func,
};

export default TopicDropdown;
