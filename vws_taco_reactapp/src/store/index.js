import {combineReducers, applyMiddleware, createStore, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import userReducer from './user/reducer';
import eventReducer from './event/reducer';
import orderReducer from './order/reducer';
import locationReducer from './location/reducer';
import ingredientReducer from './ingredient/reducer';
import errorReducer from './errors/reducer';

import * as userActions from './user/actions';
import * as eventActions from './event/actions';
import * as orderActions from './order/actions';
import * as locationActions from './location/actions';
import * as ingredientActions from './ingredient/actions';
import * as errorActions from './errors/actions';

// reducer name maps to state tree its responsible for
const rootReducer = combineReducers({
  user: userReducer,
  event: eventReducer,
  order: orderReducer,
  location: locationReducer,
  ingredient: ingredientReducer,
  errors: errorReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
export default store;

export const Actions = {
  user: userActions,
  event: eventActions,
  order: orderActions,
  location: locationActions,
  ingredient: ingredientActions,
  errors: errorActions
};

// TOD export more for 3rd parties?
// and do it i a way that is useful for 3rd parties???
