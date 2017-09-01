import React, { Component, PropTypes } from 'react';
import Title from './Title';
import './App.css';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  login = () => {
    console.log('login');
    this.setState({
      loggedIn: true
    });
  };

  logout = () => {
    console.log('logout');
    this.setState({
      loggedIn: false
    });
  };

  render() {
    return (
      <div>
        <div className="App App-header">
          <Title title="Taco App"></Title>
          <h2>username</h2>
          {
            this.state.loggedIn ? (<button onClick={this.logout}>Logout</button>)
            : (<button onClick={this.login}>Login</button>)
          }
        </div>

        {this.props.children}
      </div>
    );
  }
}
