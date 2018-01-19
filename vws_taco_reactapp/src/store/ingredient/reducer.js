import * as actions from './actions';

const initialState = {
  pending: false,
  ingredients: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_INGREDIENTS_PENDING:
      return {
        ...state,
        pending: true
      };
    case actions.INGREDIENTS_RECEIVED:
      return {
        ...state,
        ingredients: action.ingredients,
        pending: false
      };

    default:
      return state;
  }
};

export default reducer;
