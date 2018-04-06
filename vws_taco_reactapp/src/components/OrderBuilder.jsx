import React, {Component} from 'react';
import IngredientsList from './IngredientsList';
import OrderContents from './OrderContents';
import {connect} from 'react-redux';
import Loader from 'react-loader';
import {Actions} from '../store';

const mapStateToProps = state => {
  return {
    pending: state.order.pending,
    currentUser: state.user.currentUser,
    ingredients: state.ingredient.ingredients
  };
};

class OrderBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      user_id: props.currentUser.email,
      event_id: null,
      payment_amount: 0,
      order_amount: 0,
      taco_orders: []
    };
  }

  componentDidMount() {
    this.props.dispatch(Actions.ingredient.fetchIngredients(this.props.eventId));
  }

  deleteTaco(taco) {
    let taco_orders = this.state.taco_orders.filter(o => o.orderId !== taco.orderId);
    this.setState({taco_orders});
  }

  handleAddTaco = taco => {
    if (!this.props.currentUser) {
      alert('YOU MUST log in or no tacos');
      return;
    }
    // set state with appended new taco
    let newState = this.state.taco_orders.slice();
    // TODO: increment count on duplicate

    newState.push({
      orderId: newState.length + 1,
      ingredient_desc: taco.desc,
      ingredientIDs: taco.ids,
      count: 1,
      shell_id: taco.shell,
      user: this.props.currentUser.email
    });
    this.setState({taco_orders: newState});
  };

  handleSubmitOrder = () => {
    if (!this.props.currentUser) {
      alert('Please log in before submitting an order!');
      return;
    }
    if (!this.state.taco_orders.length) {
      alert('Please put some tacos in the basket, I mean CMON!');
      return;
    }
    const newOrder = {
      user_id: this.props.currentUser,
      eventId: this.props.eventId,
      orderList: this.state.taco_orders
    };
    this.props.dispatch(Actions.order.addNewOrder(newOrder));
    this.setState({taco_orders: []});
    this.props.submitOrderFinished();
  };

  render() {
    //TODO replace this with correct data
    let shell = {id: 2, shell: 'soft'};
    const orderList = [this.state];

    return (
      <div>
        <IngredientsList
          shell={shell}
          ingredients={this.props.ingredients}
          handleAddTaco={this.handleAddTaco}
        />
        <Loader loaded={!this.props.pending}>
          <OrderContents
            orderList={orderList}
            handleSubmitOrder={this.handleSubmitOrder}
            handleDeleteTaco={this.deleteTaco.bind(this)}
          />
        </Loader>
      </div>
    );
  }
}

export default connect(mapStateToProps)(OrderBuilder);
