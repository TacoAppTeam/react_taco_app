export const formatOrders = function(orders) {
  let flattenedOrders = [];
  orders.forEach(order => {
    flattenedOrders[order.taco_order_id] =
      flattenedOrders[order.taco_order_id] || {};
    flattenedOrders[order.taco_order_id].desc = flattenedOrders[
      order.taco_order_id
    ].desc
      ? flattenedOrders[order.taco_order_id].desc + ', ' + order.ingredient
      : order.ingredient;
    flattenedOrders[order.taco_order_id].user = order.user_id;
    flattenedOrders[order.taco_order_id].data = order;
  });
  return flattenedOrders;
};
