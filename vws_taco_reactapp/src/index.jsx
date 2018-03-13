import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {Provider} from 'react-redux';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Header from './components/Header';
import Home from './components/Home';
import LoginBody from './components/LoginBody';
import EventSummary from './components/EventSummary';
import PageNotFound from './components/PageNotFound';
import ProtectedRoute from './ProtectedRoute';

import store from './store';

const App = props => {
  return (
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <BrowserRouter>
          <Header>
            <Switch>
              <ProtectedRoute component={EventSummary} exact path="/event-summary/:event" />
              <ProtectedRoute component={Home} path="/" />
              <Route component={LoginBody} path="/login" />
              <Route component={PageNotFound} />
            </Switch>
          </Header>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
