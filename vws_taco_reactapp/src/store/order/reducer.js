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
      const newEventOrders = state.currentEventOrders.slice();
      action.newOrder.orderList.forEach(o => {
        const formattedOrder = {
          user: action.newOrder.user_id,
          desc: o.desc,
          data: o.data
        };
        newEventOrders.push(formattedOrder);
      });
      return {
        ...state,
        currentEventOrders: newEventOrders,
        pending: false
      };
    case actions.REMOVE_TACO_PENDING:
      return {
        ...state,
        pending: true
      };
    case actions.REMOVE_TACO:
      const newTacoOrders = state.currentEventOrders.filter(
        o => o.data.taco_order_id !== action.tacoId
      );
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
