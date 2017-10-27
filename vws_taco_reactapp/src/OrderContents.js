import React, { Component, PropTypes } from 'react';

export default class OrderContents extends Component {
  constructor(props) {
    super(props);
  }

  submitOrder = (event) => {
      event.preventDefault();

      // send off to parent
      this.props.handleSubmitOrder()
  }
  render() {
    // this component is display only
    return (
      <div>
      	Taco Orders:
        <form
          onSubmit={this.submitOrder}
          ref={form => this.form = form}>
            <ul>
            {this.props.orderList.map(order =>
                  <li>{order.count} - {order.desc}</li>
                )}
            </ul>
          <input type="submit" value="Sounds Tasty! ®"></input>
        </form>
      </div>
    );
  }
}

OrderContents.propTypes = {
  handleSubmitOrder: PropTypes.func.isRequired
}
