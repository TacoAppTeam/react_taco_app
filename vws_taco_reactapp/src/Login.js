import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div className="Login form-control">
        <form onSubmit={this.props.handleSubmit}>
            <input name="username" placeholder="Username" type="text"/>
            <br></br>
            <input name="password" placeholder="Password" type="password"/>
            <br></br>
            <button type="submit" >Submit</button>
        </form>
      </div>
    );
  }
}
