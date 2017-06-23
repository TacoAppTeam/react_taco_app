import React, { Component } from 'react';
import { Link } from 'react-router'

export default class Login extends Component {
  render() {
    return (
      <div className="Login">
        <h1>Taco Title</h1>
        <input name="username" placeholder="Username" type="text"/>
        <br></br>
        <input name="password" placeholder="Password" type="password"/>
        <br></br>
        <Link to='/taco'>Login</Link>
      </div>
    );
  }
}
