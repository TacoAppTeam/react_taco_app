import {combineReducers, applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import userReducer from './user/reducer';
import eventReducer from './event/reducer';
import locationReducer from './location/reducer';
import * as userActions from './user/actions';
import * as eventActions from './event/actions';
import * as locationActions from './location/actions';

// reducer name maps to state tree its responsible for
const rootReducer = combineReducers({user: userReducer, event: eventReducer, location: locationReducer});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store;

export const Actions = {
  user: userActions,
  event: eventActions,
  location: locationActions
};

// TOD export more for 3rd parties?
// and do it i a way that is useful for 3rd parties???
