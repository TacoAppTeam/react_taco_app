import React, { Component } from 'react';
import './App.css';
import 'whatwg-fetch';
import Events from './Events';

class App extends Component {
  render() {
    return (
      <div>
        <Events></Events>
      </div>
    );
  }
}

export default App;
