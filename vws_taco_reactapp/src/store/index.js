import {combineReducers} from 'redux';
// import {routerReducer as routing} from 'react-router-redux';
import userReducer from './user/reducer';
import * as userActions from './user/actions';

// reducer name maps to state tree its responsible for
const rootReducer = combineReducers({
		userReducer
	})
;

export default rootReducer;

export const Actions = {
	movie: userActions
};

// TOD export more for 3rd parties?
// and do it i a way that is useful for 3rd parties???
