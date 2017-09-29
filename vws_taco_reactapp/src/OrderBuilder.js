import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import IngredientsList from './IngredientsList';
import OrderContents from './OrderContents';
import Request from 'react-http-request';

export default class OrderBuilder extends Component {
  constructor (props) {
    super(props);
    this.state = {
      ingredients: [],
      orderList: []
    };
  }

  handleAddTaco (taco) {
    console.log('taco!');
    // TODO set state of orderlist with new taco
  }

  componentDidMount () {
    const apiUrl = 'http://' + window.location.hostname + ':8000/v1'
    axios.get(apiUrl + '/ingredients').then(res => {
      let ingredients = res.data.map(ing => ing.ingredient)
      this.setState({ingredients: ingredients})
    });
    const eventId = this.props.location.query["event"]
    axios.get(apiUrl + '/event?id=' + eventId).then(res => console.log(res.data))

  }

  render() {
    return (
      <div>
        <IngredientsList ingredients={this.state.ingredients} handleAddTaco={ this.handleAddTaco }></IngredientsList>
        <OrderContents orderList={this.state.orderList}></OrderContents>
      </div>
    );
  }
}
