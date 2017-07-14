import React, { Component } from 'react';
import { Link } from 'react-router'
import Title from './Title'

export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <Title></Title>
        <input name="username" placeholder="Username" type="text"/>
        <br></br>
        <input name="password" placeholder="Password" type="password"/>
        <br></br>
        <Link to='/taco'>Login</Link>
      </div>
    );
  }
}
