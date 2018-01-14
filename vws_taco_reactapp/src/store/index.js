import {combineReducers, applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import userReducer from './user/reducer';
import eventReducer from './event/reducer';
import orderReducer from './order/reducer';
import * as userActions from './user/actions';
import * as eventActions from './event/actions';
import * as orderActions from './order/actions';

// reducer name maps to state tree its responsible for
const rootReducer = combineReducers({
  user: userReducer,
  event: eventReducer,
  order: orderReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store;

export const Actions = {
  user: userActions,
  event: eventActions,
  order: orderActions
};

// TOD export more for 3rd parties?
// and do it i a way that is useful for 3rd parties???
