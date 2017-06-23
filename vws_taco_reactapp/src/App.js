import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'
import Home from './Home';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Home} />
        <Route path='/taco' component={Taco} />
        <Route path='*' component={NotFound} />
      </Router>
    )
  }
}

const Taco = () => <h1>Welcome to the Taco App.</h1>
const NotFound = () => (<h1>404.. This page is not found!</h1>)
export default App
