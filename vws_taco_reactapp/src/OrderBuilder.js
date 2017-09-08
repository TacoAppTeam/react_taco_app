import React, { Component } from 'react';
import IngredientsList from './IngredientsList';
import OrderContents from './OrderContents';
import Request from 'react-http-request';

export default class OrderBuilder extends Component {
  constructor (props) {
    super(props);
    this.state = {
      orderList: [{orderId: 1, desc: 'Egg, Sausage', count: 3},
      	{orderId: 2, desc: 'Egg, Potato', count: 2}
      ]
    };
  }

  handleAddTaco (taco) {
    console.log('taco!');
    // TODO set state of orderlist with new taco
  }

  render() {
    return (
      <div>
      <Request
        url='http://192.168.56.101:8000/v1/ingredients'
        method='get'
        accept='application/json'
        verbose={true}
        mode='no-cors'
      >
        {
          ({error, result, loading}) => {
            if (loading) {
              return <div>loading...</div>;
            } else {

              let body = result && result.body;

              let data = [];
              for(var ingredientData of body) {
                let ingredient = {};
                ingredient.id = ingredientData.ingredient.id;
                ingredient.name = ingredientData.ingredient.name;
                ingredient.description = ingredientData.ingredient.description;
                ingredient.price = ingredientData.ingredient.price;
                data.push(ingredient);
              }

              return (
                <IngredientsList ingredients={data} handleAddTaco={ this.handleAddTaco }></IngredientsList>
              );

            }
          }
        }
      </Request>

      <OrderContents orderList={this.state.orderList}></OrderContents>
      </div>
    );
  }
}