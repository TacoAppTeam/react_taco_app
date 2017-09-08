import React, { Component } from 'react';
import IngredientsList from './IngredientsList';
import OrderContents from './OrderContents';

export default class OrderBuilder extends Component {
  constructor (props) {
    super(props);
    this.state = {
      orderList: [{orderId: 1, desc: 'Egg, Sausage', count: 3}, 
      	{orderId: 2, desc: 'Egg, Potato', count: 2}
      ]
    };
    this.ingredients = [
        'Egg',
        'Bacon',
        'Sausage',
        'Cheese'
      ]
  }

  handleAddTaco (taco) {
    console.log('taco!');
    // TODO set state of orderlist with new taco
  }

  render() {
    return (
      <div>
      <IngredientsList ingredients={this.ingredients} handleAddTaco={ this.handleAddTaco }></IngredientsList>
      <OrderContents orderList={this.state.orderList}></OrderContents>
      </div>
    );
  }
}
