import axios from 'axios';
import {config} from '../../config';

export const ADD_NEW_ORDER = 'ADD_NEW_ORDER';
export const ADD_ORDER_PENDING = 'ADD_ORDER_PENDING';
export const EVENT_ORDERS_RETRIEVED = 'EVENT_ORDERS_RETRIEVED';

export const addNewOrder = newOrder => {
  function addOrderToAPI(data) {
    const new_order_url =
      config.api_hostname + ':' + config.api_port + '/v1/submit_order';
    return axios
      .post(new_order_url, data, {'Access-Control-Allow-Origin': '*'})
      .then(res => {
        console.log('Added new order: ' + res);
      });
  }

  return function(dispatch) {
    dispatch({
      type: ADD_ORDER_PENDING
    });
    return addOrderToAPI(newOrder).then(res =>
      dispatch({
        type: ADD_NEW_ORDER,
        newOrder
      })
    );
  };
};

export const fetchEventOrders = eventId => {
  function getEventOrders(eventId) {
    const order_url =
      config.api_hostname +
      ':' +
      config.api_port +
      '/v1/event_orders?event_id=' +
      eventId;
    return axios.get(order_url).then(res => {
      let flattenedOrders = [];
      res.data.forEach(order => {
        flattenedOrders[order.taco_order_id] =
          flattenedOrders[order.taco_order_id] || {};
        flattenedOrders[order.taco_order_id].desc = flattenedOrders[
          order.taco_order_id
        ].desc
          ? flattenedOrders[order.taco_order_id].desc + ', ' + order.ingredient
          : order.ingredient;
        flattenedOrders[order.taco_order_id].user = order.user_id;
      });
      return flattenedOrders;
    });
  }

  return function(dispatch) {
    return getEventOrders(eventId).then(res =>
      dispatch({
        type: EVENT_ORDERS_RETRIEVED,
        eventOrders: res
      })
    );
  };
};
