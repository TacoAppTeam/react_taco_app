import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, browserHistory, Redirect } from 'react-router';
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
    // TODO: Ask Josh about handling loginToken
    if(!this.state || !this.state.loginToken) {
      // Set path to /login
      <Redirect to="/login"/>
    }

    return (
      <Router history={browserHistory}>
        <Route path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/taco' component={Taco} />
        <Route path='*' component={NotFound} />
      </Router>
    )
  }
}

const Taco = () => <h1>Welcome to the Taco App.</h1>
const NotFound = () => (<h1>404.. This page is not found!</h1>)
export default App
