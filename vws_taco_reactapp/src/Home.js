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
        <TacoRequest></TacoRequest>
      </div>
    );
  }
}

class TacoRequest extends Component {
  render() {
    return (
      <div />
    );
  }
}


var checkStatus = function(response) {
  console.log(response);
  if (response.status >= 200 && response.status < 300) {
    console.log(response);
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    console.log(error.response);
  }
}


// TODO: Not working.  Trying to call hug api using whatwg-fetch
var callApiFetch = function () {
  console.log('callApi happened');

  fetch('http://192.168.56.101:8000/v1/event?id=1',
    {
      mode: 'no-cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(checkStatus)
}


export default App;
