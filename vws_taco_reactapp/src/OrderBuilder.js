import React, { Component } from 'react';
import IngredientsList from './IngredientsList';
import OrderContents from './OrderContents';

export default class OrderBuilder extends Component {
  constructor (props) {
    super(props);

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
      <OrderContents></OrderContents>
      </div>
    );
  }
}
