import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
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
import LocationMgmt from './components/LocationMgmt';
import LocationSummary from './components/LocationSummary';

import store from './store';

const colorPalette = {
  primary1Color: '#f57c00',
  primary2Color: '#e64a19',
  accent1Color: '#80deea',
  pickerHeaderColor: '#2196f3'
};

const getTheme = () => {
  let overwrites = {
    colorPalette
  };
  return getMuiTheme(lightBaseTheme, overwrites);
};

export let theme = getTheme();
export const styles = {
  palette: colorPalette,
  header: {
    color: theme.primary1Color
  },
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  paper: {
    margin: 20,
    padding: 20,
    textAlign: 'left',
    display: 'inline-block'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  button: {
    margin: 10
  }
};

const App = props => {
  return (
    <Provider store={store}>
      <MuiThemeProvider muiTheme={theme}>
        <BrowserRouter>
          <Header styles={styles.header}>
            <Switch>
              <ProtectedRoute component={EventSummary} exact path="/event-summary/:event" />
              <ProtectedRoute component={Home} exact path="/" />
              <Route component={LoginBody} exact path="/login" />
              <ProtectedRoute component={LocationMgmt} exact path="/locationmgmt" />
              <ProtectedRoute component={LocationSummary} exact path="/location-sumary/:location" />
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
