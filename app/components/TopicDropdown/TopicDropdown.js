import React from 'react';
import PropTypes from 'prop-types';

function TopicDropdown({ topics, onChange }) {
  return (
    <select onChange={onChange}>
      {topics &&
        topics.length > 0 &&
        topics.map(topic => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
    </select>
  );
}

TopicDropdown.propTypes = {
  topics: PropTypes.array,
  onChange: PropTypes.func,
};

export default TopicDropdown;
