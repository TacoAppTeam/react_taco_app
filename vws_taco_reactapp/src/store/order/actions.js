import axios from 'axios';
import {config} from '../../config';
import {formatOrders} from '../../utils/format';

export const ADD_NEW_ORDER = 'ADD_NEW_ORDER';
export const ADD_ORDER_PENDING = 'ADD_ORDER_PENDING';
export const EVENT_ORDERS_RETRIEVED = 'EVENT_ORDERS_RETRIEVED';
export const REMOVE_TACO_PENDING = 'REMOVE_TACO_PENDING';
export const REMOVE_TACO = 'REMOVE_TACO';
export const GET_USER_ORDER_DATA = 'GET_USER_ORDER_DATA';
export const USER_ORDER_DATA_RETRIEVED = 'USER_ORDER_DATA_RETRIEVED';

export const addNewOrder = newOrder => {
  function addOrderToAPI(data) {
    const new_order_url =
      config.api_hostname + ':' + config.api_port + '/v1/submit_order';
    return axios.post(new_order_url, data, {
      'Access-Control-Allow-Origin': '*'
    });
  }

  return function(dispatch) {
    dispatch({
      type: ADD_ORDER_PENDING
    });
    return addOrderToAPI(newOrder).then(res => {
      dispatch({
        type: ADD_NEW_ORDER,
        newOrder: {
          user_id: newOrder.user_id,
          event: newOrder.event,
          orderList: formatOrders(res.data)
        }
      });
    });
  };
};

export const removeTaco = tacoId => {
  function removeTacoAPI(tacoId) {
    const remove_taco_url =
      config.api_hostname + ':' + config.api_port + '/removeTaco';
    return axios
      .post(
        remove_taco_url,
        {taco_order_id: tacoId},
        {'Access-Control-Allow-Origin': '*'}
      )
      .then(res => {
        console.log('Removed the taco, boss.');
      });
  }

  return function(dispatch) {
    dispatch({
      type: REMOVE_TACO_PENDING
    });
    return removeTacoAPI(tacoId).then(res =>
      dispatch({
        type: REMOVE_TACO,
        tacoId
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
      return formatOrders(res.data);
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

export const fetchUserOrders = (eventId, userId) => {
  function getUserOrders(eventId, userId) {
    const order_url =
      config.api_hostname +
      ':' +
      config.api_port +
      '/v1/event_orders?event_id=' +
      eventId +
      '&user_id=' +
      userId;
    return axios.get(order_url).then(res => {
      return formatOrders(res.data);
    });
  }

  return function(dispatch) {
    dispatch({
      type: GET_USER_ORDER_DATA
    });

    return getUserOrders(eventId, userId).then(res =>
      dispatch({
        type: USER_ORDER_DATA_RETRIEVED,
        userOrders: res
      })
    );
  };
};
