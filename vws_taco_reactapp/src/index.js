import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {Provider} from 'react-redux';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import jwt_decode from 'jwt-decode';

import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import EventSummary from './components/EventSummary';
import PageNotFound from './components/PageNotFound';

import store from './store';

class App extends React.Component {
  checkLoggedIn() {
    try {
      const token = localStorage.getItem('token');
      const user = jwt_decode(token);

      return user;
    } catch {
      return false;
    }
  }

  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <Header>
            {checkLoggedIn() ? (
              <Router history={browserHistory}>
                <Route component={Home} path="/" />
                <Route component={Login} path="/login" />
                <Route component={EventSummary} path="/event-summary" />
                <Route component={PageNotFound} path="*" />
              </Router>
            ) : (
              <Router history={browserHistory}>
                <Route component={Login} path="*" />
              </Router>
            )}
          </Header>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
