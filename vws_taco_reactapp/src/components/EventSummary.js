import React, {Component} from 'react';
import {connect} from 'react-redux';
import OrderContents from './OrderContents.js';
import {Actions} from '../store';
import Loader from 'react-loader';
import TacoModal from './TacoModal.js';
import OrderBuilder from './OrderBuilder.js';
import {dateFormat} from '../utils/format';

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
    eventOrderList: state.order.currentEventOrders,
    eventOrderListPending: state.order.pending,
    eventData: state.event.eventData,
    eventsPending: state.event.eventsPending
  };
}

class EventSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false};
  }

  componentDidMount() {
    this.props.dispatch(Actions.event.fetchEvents());

    this.props.dispatch(
      Actions.order.fetchEventOrders(parseInt(this.props.match.params.event, 10))
    );
  }

  getEventData = () => {
    let eventData = {};
    let eventId = parseInt(this.props.match.params.event, 10);

    eventData = this.props.eventData.find(function(event) {
      return event.id === eventId;
    });

    if (eventData) {
      return eventData;
    }

    return {};
  };

  getEventDate = () => {
    let eventData = this.getEventData();

    if (Object.keys(eventData).length) {
      return dateFormat(eventData.date);
    }

    return '';
  };

  getUserEvents = () => {
    let user = this.props.currentUser;

    return this.props.eventOrderList.length
      ? this.props.eventOrderList.filter(function(order) {
          return user && order.user === user.email;
        })
      : null;
  };

  closeModal = () => {
    this.setState({showModal: false});
  };

  deleteTaco = taco => {
    if (this.props.currentUser.email !== taco.user) {
      alert('NO YOU CANT YOU JUST CANT');
      return;
    }

    this.props.dispatch(Actions.order.removeTaco(taco.data.taco_order_id));
  };

  openModal = () => {
    this.setState({showModal: true});
  };

  render() {
    return (
      <Loader loaded={!this.props.eventOrderListPending && !this.props.eventsPending}>
        <div className="eventSummary">
          <h2>Date of Event: {this.getEventDate()}</h2>
          <h3>All event orders</h3>
          <OrderContents
            orderList={this.props.eventOrderList.length ? this.props.eventOrderList : null}
          />
          <h3>User orders</h3>
          <OrderContents orderList={this.getUserEvents()} handleDeleteTaco={this.deleteTaco} />
          <button onClick={this.openModal}>Order Tacos</button>
          <TacoModal showModal={this.state.showModal} title="Order Builder" close={this.closeModal}>
            <OrderBuilder
              eventId={this.props.match.params.event}
              submitOrderFinished={this.closeModal}
            />
          </TacoModal>
        </div>
      </Loader>
    );
  }
}

export default connect(mapStateToProps)(EventSummary);
