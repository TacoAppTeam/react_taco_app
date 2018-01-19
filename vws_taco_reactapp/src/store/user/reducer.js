import * as userActions from './actions';

const initialState = {
  currentUser: 'cody.abney@viasat.com'
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
        users: [],
        usersPending: true
      };
    case userActions.USERS_RETRIEVED:
      return {
        ...state,
        users: action.users,
        usersPending: false
      };
    default:
      return state;
  }
};

export default reducer;
