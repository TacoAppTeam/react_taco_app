import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {Provider} from 'react-redux';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import EventSummary from './components/EventSummary';
import PageNotFound from './components/PageNotFound';

import store from './store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <Header>
            {localStorage.getItem('user') ? (
              <Router history={browserHistory}>
                <Route component={Home} path="/" />
                <Route component={Login} path="/login" />
                <Route component={EventSummary} path="/events" />
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
