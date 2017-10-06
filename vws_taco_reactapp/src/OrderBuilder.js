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
      orderList: [],
      event: {}
    };
    this.handleAddTaco = this.handleAddTaco.bind(this);
    this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
  }

  handleAddTaco (taco) {
    // set state with appended new taco
    let newState = this.state.orderList.slice()
    console.log(taco)
    // TODO: increment count on duplicate
    newState.push({orderId:(newState.length + 1), desc: taco.desc, ingredientIDs: taco.ids, count: 1})
    this.setState({orderList:newState})
  }

  handleSubmitOrder () {
    console.log('submitting order (not really yet)')
    // TODO: this api call is failing because:
    // No 'Access-Control-Allow-Origin' header is present on the requested resource.

    // const apiUrl = 'http://' + window.location.hostname + ':8000/v1'
    // axios.post(apiUrl + '/submit_order', {
    //   user_id: '1',
    //   event: this.state.event,
    //   orderList: this.state.orderList
    // }).then(res => console.log(res))

    // logic for api:
    //
    // create Order(logged in userid, this.state.event.id)
    // get Order.getID
    // for taco in orderList:
    //    create Taco_Order(order_id, taco.shell_id)
    //    get Taco_Order id from ^
    //    for ingredient in taco.ingredients:
    //        create Taco_ing(taco_order id, ingredient id)
  }

  componentDidMount () {
    const apiUrl = 'http://' + window.location.hostname + ':8000/v1'
    axios.get(apiUrl + '/ingredients').then(res => {
      let ingredients = res.data.map(ing => ing.ingredient)
      this.setState({ingredients: ingredients})
    });

    const eventId = this.props.location.query["event"]
    axios.get(apiUrl + '/event?id=' + eventId).then(res =>
      this.setState({event: res.data})
    )
  }

  render() {
    let shell = {id: 2, shell: 'soft'}
    return (
      <div>
        <IngredientsList shell={shell}
                         ingredients={this.state.ingredients}
                         handleAddTaco={this.handleAddTaco}
                         >
        </IngredientsList>
        <OrderContents orderList={this.state.orderList} handleSubmitOrder={this.handleSubmitOrder}></OrderContents>
      </div>
    );
  }
}
