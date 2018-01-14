import React, {Component} from 'react';
import axios from 'axios';
import IngredientsList from './IngredientsList';
import OrderContents from './OrderContents';
import TacoModal from './TacoModal.js';
import {connect} from 'react-redux';
import {Actions} from '../store';

import {config} from '../config.js';
import {match} from 'react-router/lib';

const mapStateToProps = state => {
  return {
    submitOrderPending: state.order.pending,
    currentUser: state.user.currentUser,
    currentEventData: state.order.currentEventOrders
  };
};

class OrderBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      orderList: [],
      event: {},
      showModal: false
    };
    this.handleAddTaco = this.handleAddTaco.bind(this);
    this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
  }

  closeModal = () => {
    this.setState({showModal: false, orderList: []});
  };

  handleSubmitOrder() {
    if (this.props.currentUser == 'Please Log in') {
      alert('Please log in before submitting an order!');
      return;
    }
    const newOrder = {
      user_id: this.props.currentUser, // TODO: not hardcode this
      event: this.state.event,
      orderList: this.state.orderList
    };
    this.props.dispatch(Actions.order.addNewOrder(newOrder));
    this.setState({orderList: []});
  }

  handleAddTaco(taco) {
    // set state with appended new taco
    let newState = this.state.orderList.slice();
    // TODO: increment count on duplicate
    newState.push({
      orderId: newState.length + 1,
      desc: taco.desc,
      ingredientIDs: taco.ids,
      count: 1,
      shell_id: taco.shell
    });
    this.setState({orderList: newState});
  }

  componentDidMount() {
    this.props.dispatch(
      Actions.order.fetchEventOrders(this.props.location.query['event'])
    );

    //TODO change to mapState, dispatch
    const apiUrl = 'http://' + window.location.hostname + ':8000/v1';
    axios.get(apiUrl + '/ingredients').then(res => {
      let ingredients = res.data.map(ing => ing.ingredient);
      this.setState({ingredients: ingredients});
    });

    const eventId = this.props.location.query['event'];
    axios
      .get(apiUrl + '/event?id=' + eventId)
      .then(res => this.setState({event: res.data}));
  }

  render() {
    //TODO replace this with correct data
    let shell = {id: 2, shell: 'soft'};

    return (
      <div>
        <IngredientsList
          shell={shell}
          ingredients={this.state.ingredients}
          handleAddTaco={this.handleAddTaco}
        />
        <OrderContents
          orderList={this.state.orderList}
          handleSubmitOrder={this.handleSubmitOrder}
          overwriteUser={this.props.currentUser}
          handleDeleteTaco={taco => {
            let orderList = this.state.orderList.filter(
              o => o.orderId === taco.orderId
            );
            this.setState({orderList});
          }}
        />
        <TacoModal
          title="Order Submitted!"
          showModal={this.state.showModal}
          close={this.closeModal}
        />
        <OrderContents
          orderList={this.props.currentEventData}
          handleSubmitOrder={null}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(OrderBuilder);
