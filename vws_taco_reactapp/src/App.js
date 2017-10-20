import routes from './routes';
import React, { Component } from 'react';
import { Router, browserHistory, Redirect } from 'react-router';

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
      // return (<Redirect to="/login"/>)
    }

    return (
      <Router history={browserHistory} routes={routes}/>
    )
  }
}

export default App
