import React, {Component} from 'react';
import {connect} from 'react-redux';
import OrderContents from './OrderContents.js';
import {Actions} from '../store';
import Loader from 'react-loader';
import TacoModal from './TacoModal.js';
import OrderBuilder from './OrderBuilder.js';

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
    eventOrderList: state.order.currentEventOrders,
    eventOrderListPending: state.order.pending,
    userOrderList: state.order.currentUserOrders,
    userOrderListPending: state.order.getUserOrdersPending,
    eventData: state.event.eventData,
    eventsPending: state.event.eventsPending
  };
}

class EventSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false};
  }

  getEventDate = () => {
    if (this.props.eventData.length) {
      return this.props.eventData[0].date;
    }

    return '';
  };

  openModal = () => {
    this.setState({showModal: true});
  };

  closeModal = () => {
    this.getOrders();
    this.setState({showModal: false});
  };

  deleteTaco = taco => {
    if (this.props.currentUser !== taco.user) {
      alert('NO YOU CANT YOU JUST CANT');
      return;
    }

    this.props.dispatch(Actions.order.removeTaco(taco.data.taco_order_id));
  };

  getOrders = () => {
    this.props.dispatch(
      Actions.order.fetchUserOrders(
        this.props.location.query['event'],
        this.props.currentUser
      )
    );

    this.props.dispatch(
      Actions.order.fetchEventOrders(this.props.location.query['event'])
    );
  };

  componentDidMount() {
    this.props.dispatch(
      Actions.event.fetchEvents(this.props.location.query['event'])
    );

    this.getOrders();
  }

  render() {
    return (
      <Loader
        loaded={
          !this.props.eventOrderListPending &&
          !this.props.userOrderListPending &&
          !this.props.eventsPending
        }
      >
        <div className="eventSummary">
          <h2>Date of Event: {this.getEventDate()}</h2>
          <h3>All event orders</h3>
          <OrderContents orderList={this.props.eventOrderList} />
          <h3>User orders</h3>
          <OrderContents
            orderList={this.props.userOrderList}
            handleDeleteTaco={this.deleteTaco}
          />
          <button onClick={this.openModal}>Order Tacos</button>
          <TacoModal
            showModal={this.state.showModal}
            title="Order Builder"
            close={this.closeModal}
          >
            <OrderBuilder
              eventId={this.props.location.query['event']}
              submitOrderFinished={this.closeModal}
            />
          </TacoModal>
        </div>
      </Loader>
    );
  }
}

export default connect(mapStateToProps)(EventSummary);
