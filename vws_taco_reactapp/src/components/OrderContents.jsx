import React, {Component} from 'react';

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
                return (
                  <li key={idx}>
                    {order.desc} (from: {order.user})
                    {this.props.handleDeleteTaco ? (
                      <span
                        onClick={() => {
                          this.props.handleDeleteTaco(order);
                        }}
                      >
                        X
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ul>
            {this.props.handleSubmitOrder ? <input type="submit" value="Sounds Tasty! ®" /> : null}
          </form>
        ) : (
          <div>NO ORDERS YET!!!</div>
        )}
      </div>
    );
  }
}

OrderContents.propTypes = {};
