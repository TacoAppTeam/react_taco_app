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
    this.handleAddTaco = this.handleAddTaco.bind(this);
  }

  handleAddTaco (taco) {
    // set state with appended new taco
    let newState = this.state.orderList.slice()
    console.log(taco)
    newState.push({orderId:(newState.length + 1), desc: taco.desc, ingredientIDs: taco.ids, count: 1})
    this.setState({orderList:newState})
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
    let shell = {id: 2, shell: 'soft'}
    return (
      <div>
        <IngredientsList shell={shell} ingredients={this.state.ingredients} handleAddTaco={ this.handleAddTaco }></IngredientsList>
        <OrderContents orderList={this.state.orderList}></OrderContents>
      </div>
    );
  }
}
