import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class OrderContents extends Component {
  constructor(props) {
    super(props);

    // If this constructor isn't going to do something, it is "useless" and should be removed.
    // https://eslint.org/docs/2.0.0/rules/no-useless-constructor
    doSomething();
  }

  submitOrder = event => {
    event.preventDefault();

    // send off to parent
    this.props.handleSubmitOrder();
  };
  render() {
    // this component is display only
    return (
      <div>
        Taco Orders:
        <form onSubmit={this.submitOrder} ref={form => (this.form = form)}>
          <ul>
            {this.props.orderList.map(order => (
              <li>
                {order.count} - {order.desc}
              </li>
            ))}
          </ul>
          <input type="submit" value="Sounds Tasty! ®" />
        </form>
      </div>
    );
  }
}

OrderContents.propTypes = {
  handleSubmitOrder: PropTypes.func.isRequired
};

function doSomething() {
  return;
}
