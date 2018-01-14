import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class OrderContents extends Component {
  submitOrder = event => {
    event.preventDefault();

    // send off to parent
    if (this.props.handleSubmitOrder) {
      this.props.handleSubmitOrder();
    }
  };
  render() {
    // this component is display only
    return (
      <div>
        Taco Orders:
        {this.props.orderList ? (
          <form onSubmit={this.submitOrder} ref={form => (this.form = form)}>
            <ul>
              {this.props.orderList.map(order => (
                <li>
                  {order.desc} (from:
                  {order.user || this.props.overwriteUser})
                  <span onClick={() => this.props.handleDeleteTaco(order)}>
                    X
                  </span>
                </li>
              ))}
            </ul>
            {this.props.handleSubmitOrder ? (
              <input type="submit" value="Sounds Tasty! ®" />
            ) : null}
          </form>
        ) : (
          <div>NO ORDERS YET!!!</div>
        )}
      </div>
    );
  }
}

OrderContents.propTypes = {
  handleSubmitOrder: PropTypes.func.isRequired,
  handleDeleteTaco: PropTypes.func.isRequired
};
