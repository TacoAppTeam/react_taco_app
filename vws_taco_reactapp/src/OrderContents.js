import React, { Component } from 'react';

export default class OrderContents extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
      	Taco Orders:
      	<div>
      		<ul>
      			{this.props.orderList.map(order =>
              		<li>{order.count} - {order.desc}</li>
                )}
      		</ul>
      	</div>
      	<button>Sounds Tasty! ®</button>
      </div>
    );
  }
}