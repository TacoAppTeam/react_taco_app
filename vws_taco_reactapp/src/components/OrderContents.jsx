import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class OrderContents extends Component {
  submitOrder = event => {
    event.preventDefault();

    // send off to parent
    if (this.props.handleSubmitOrder) {
      this.props.handleSubmitOrder();
    }
  };
  render() {
    return (
      <div>
        Taco Orders:
        {this.props.orderList ? (
          <form onSubmit={this.submitOrder} ref={form => (this.form = form)}>
            <ul>
              {this.props.orderList.map((order, idx) => {
                const user = order.user_id;
                const orderAmount = order.order_amount;
                const amountPaid = order.payment_amount;

                return (
                  <li key={idx}>
                    <div>Order by: {user}</div>
                    <div>Cost: {orderAmount}</div>
                    <div>Amt Paid: {amountPaid}</div>
                    <ul>
                      {order.taco_orders.map((taco, idx) => {
                        taco.user = user;
                        return (
                          <li key={idx}>
                            <span>{taco.ingredient_desc}</span>
                            {this.props.handleDeleteTaco ? (
                              <span
                                onClick={() => {
                                  this.props.handleDeleteTaco(taco);
                                }}
                              >
                                X
                              </span>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
            {this.props.handleSubmitOrder ? (
              <RaisedButton primary type="submit" label="Sounds Tasty! ®" />
            ) : null}
          </form>
        ) : (
          <div>NO ORDERS YET!!!</div>
        )}
      </div>
    );
  }
}

OrderContents.propTypes = {};
