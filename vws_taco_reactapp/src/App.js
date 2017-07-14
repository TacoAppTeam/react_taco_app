import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'
import Home from './Home';
import Login from './Login';
import Title from './Title';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginToken: undefined,
      handleSubmit: (e) => {
        e.preventDefault();
        this.setState({loginToken: "HHHJJJKKK"});
      }
    };
  }

  render() {
    if(!this.state || !this.state.loginToken) {
      return (
        <div>
          <Title title="Taco Title"></Title>
          <Login handleSubmit={this.state.handleSubmit}/>
        </div>
        );
    } else {
      return (
        <Home loginToken={this.state.loginToken} />
      )
    }
  }
}

const Taco = () => <h1>Welcome to the Taco App.</h1>
const NotFound = () => (<h1>404.. This page is not found!</h1>)
export default App
