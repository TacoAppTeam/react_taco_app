import React from 'react';

export const formatOrders = function(orders) {
  let flattenedOrders = [];
  for (let i = 0; i < orders.length; i++) {
    let order = orders[i];
    flattenedOrders[i] = flattenedOrders[i] || {};
    flattenedOrders[i].desc = flattenedOrders[i].desc
      ? flattenedOrders[i].desc + ', ' + order.ingredient
      : order.ingredient;
    flattenedOrders[i].user = order.user_id;
    flattenedOrders[i].data = order;
  }
  return flattenedOrders;
};

export const dateFormat = function(props) {
  const value = props && (props.value || props);
  if (value) {
    return <div>{new Date(value).toLocaleDateString()}</div>;
  }
  return <div />;
};
