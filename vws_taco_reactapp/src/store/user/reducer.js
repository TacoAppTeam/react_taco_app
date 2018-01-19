import * as userActions from './actions';

const initialState = {
  currentUser: 'cody.abney@viasat.com',
  list: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user
      };
    case userActions.GET_USERS_DATA:
      return {
        ...state,
        usersPending: true
      };
    case userActions.USERS_RETRIEVED:
      return {
        ...state,
        list: action.list,
        usersPending: false
      };
    default:
      return state;
  }
};

export default reducer;
