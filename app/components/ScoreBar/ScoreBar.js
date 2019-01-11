import React from 'react';
import PropTypes from 'prop-types';
import { formatThousands } from 'utils/numbers';
import { Bar } from './look';

function ScoreBar({ score }) {
  const formattedScore = formatThousands(score);

  return (
    <Bar>
      <button type="button">+</button>
      <p>{formattedScore}</p>
      <button type="button">-</button>
    </Bar>
  );
}

ScoreBar.propTypes = {
  score: PropTypes.number,
};

export default ScoreBar;
