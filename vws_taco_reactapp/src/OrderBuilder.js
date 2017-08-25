import React, { Component } from 'react';
import IngredientsList from './IngredientsList';
import OrderContents from './OrderContents';

export default class OrderBuilder extends Component {
  render() {
    return (
      <div>
      <IngredientsList></IngredientsList>
      <OrderContents></OrderContents>
      </div>
    );
  }
}
