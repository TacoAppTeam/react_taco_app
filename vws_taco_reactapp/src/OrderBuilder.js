import React, { Component } from 'react';
import IngredientsList from './IngredientsList';
import OrderContents from './OrderContents';

export default class OrderBuilder extends Component {
	constructor(props) {
    super(props);
    this.state = {
      orderList: [{orderId: 1, desc: 'Egg, Sausage', count: 3}, 
      	{orderId: 2, desc: 'Egg, Potato', count: 2}
      ]
    };
  }

  render() {
    return (
      <div>
      <IngredientsList></IngredientsList>
      <OrderContents orderList={this.state.orderList}></OrderContents>
      </div>
    );
  }
}
