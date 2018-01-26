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
