import React, { Component } from 'react';
import { Link } from 'react-router';
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
      <div className="container">
        <Title title="Taco App"></Title>
        <div className="App navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li><a>username</a></li>
              <li><Link to={'/'}>Events</Link></li>
            </ul>
          </div>
        </div>

           {
            this.state.loggedIn ? (<button onClick={this.logout}>Logout</button>)
            : (<button onClick={this.login}>Login</button>)
            }


        {this.props.children}
      </div>
    );
  }
}
