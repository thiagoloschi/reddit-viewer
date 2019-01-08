/* 
  Following exception is added in order to make hot reloading possible as it doesn't support stateless functional
  components
*/
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default class HomePage extends React.PureComponent {
  render() {
    return (
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
    );
  }
}
