import React, { Component } from 'react';
import Login from './Login';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';
import Request from 'react-http-request';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React, {this.props.loginToken}</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <TacoRequest></TacoRequest>
        <Login></Login>
      </div>
    );
  }
}

class TacoRequest extends Component {
  render() {
    return (
      <Request
        url='http://192.168.56.101:8000/v1/location?id=1'
        method='get'
        accept='application/json'
        verbose={true}
        mode='no-cors'
      >
        {
          ({error, result, loading}) => {
            if (loading) {
              return <div>loading...</div>;
            } else {
              return <div>{ JSON.stringify(result) }</div>;
            }
          }
        }
      </Request>
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