import React, { Component } from 'react';
import './App.css';
import 'whatwg-fetch';
import Request from 'react-http-request';
import Events from './Events';
import Header from './Header';

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
