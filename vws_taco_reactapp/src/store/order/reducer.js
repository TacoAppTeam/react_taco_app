import * as actions from './actions';

const initialState = {
  pending: false,
  currentEventOrders: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_ORDER_PENDING:
      return {
        ...state,
        pending: true
      };
    case actions.ADD_NEW_ORDER:
      return {
        ...state,
        pending: false
      };
    case actions.REMOVE_TACO_PENDING:
      return {
        ...state,
        pending: true
      };
    case actions.REMOVE_TACO:
      const newTacoOrders = state.currentEventOrders.map(order => {
        order.taco_orders = order.taco_orders.filter(o => o.taco_id !== action.tacoId);
        return order;
      });

      return {
        ...state,
        currentEventOrders: newTacoOrders,
        pending: false
      };
    case actions.EVENT_ORDERS_RETRIEVED:
      return {
        ...state,
        currentEventOrders: action.eventOrders
      };
    default:
      return state;
  }
};

export default reducer;
