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
      orderList: []
    };
  }

  componentDidMount() {
    this.props.dispatch(Actions.ingredient.fetchIngredients(this.props.eventId));
  }

  deleteTaco(taco) {
    if (this.props.currentUser.email !== taco.user) {
      alert('NO YOU CANT YOU JUST CANT');
      return;
    }

    let orderList = this.state.orderList.filter(o => o.orderId !== taco.orderId);
    this.setState({orderList});
  }

  handleAddTaco = taco => {
    if (!this.props.currentUser) {
      alert('YOU MUST log in or no tacos');
      return;
    }
    // set state with appended new taco
    let newState = this.state.orderList.slice();
    // TODO: increment count on duplicate
    newState.push({
      orderId: newState.length + 1,
      desc: taco.desc,
      ingredientIDs: taco.ids,
      count: 1,
      shell_id: taco.shell,
      user: this.props.currentUser.email
    });
    this.setState({orderList: newState});
  };

  handleSubmitOrder = () => {
    if (!this.props.currentUser) {
      alert('Please log in before submitting an order!');
      return;
    }
    if (!this.state.orderList.length) {
      alert('Please put some tacos in the basket, I mean CMON!');
      return;
    }
    const newOrder = {
      user_id: this.props.currentUser,
      eventId: this.props.eventId,
      orderList: this.state.orderList
    };
    this.props.dispatch(Actions.order.addNewOrder(newOrder));
    this.setState({orderList: []});
    this.props.submitOrderFinished();
  };

  render() {
    //TODO replace this with correct data
    let shell = {id: 2, shell: 'soft'};

    return (
      <div>
        <IngredientsList
          shell={shell}
          ingredients={this.props.ingredients}
          handleAddTaco={this.handleAddTaco}
        />
        <Loader loaded={!this.props.pending}>
          <OrderContents
            orderList={this.state.orderList}
            handleSubmitOrder={this.handleSubmitOrder}
            handleDeleteTaco={this.deleteTaco.bind(this)}
          />
        </Loader>
      </div>
    );
  }
}

export default connect(mapStateToProps)(OrderBuilder);
