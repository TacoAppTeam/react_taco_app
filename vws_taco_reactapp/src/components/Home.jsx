import React from 'react';
import 'whatwg-fetch';
import Events from './Events';
import {withRouter} from 'react-router-dom';

const App = props => {
  return (
    <div>
      <Events />
    </div>
  );
};

export default withRouter(App);
