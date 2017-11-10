import routes from './routes';
import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory} routes={routes}/>
    )
  }
}

export default App
