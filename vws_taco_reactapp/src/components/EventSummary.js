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
    eventData: state.event.eventData,
    eventsPending: state.event.eventsPending
  };
}

class EventSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false};
  }

  getEventData = () => {
    let eventData = {};
    let eventId = parseInt(this.props.location.query['event']);

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
      return eventData.date;
    }

    return '';
  };

  openModal = () => {
    this.setState({showModal: true});
  };

  closeModal = () => {
    this.setState({showModal: false});
  };

  deleteTaco = taco => {
    if (this.props.currentUser !== taco.user) {
      alert('NO YOU CANT YOU JUST CANT');
      return;
    }

    this.props.dispatch(Actions.order.removeTaco(taco.data.taco_order_id));
  };

  getUserEvents = () => {
    let user = this.props.currentUser;

    return this.props.eventOrderList.filter(function(order) {
      return order.user === user;
    });
  };

  componentDidMount() {
    this.props.dispatch(Actions.event.fetchEvents());

    this.props.dispatch(
      Actions.order.fetchEventOrders(this.props.location.query['event'])
    );
  }

  render() {
    return (
      <Loader
        loaded={!this.props.eventOrderListPending && !this.props.eventsPending}
      >
        <div className="eventSummary">
          <h2>Date of Event: {this.getEventDate()}</h2>
          <h3>All event orders</h3>
          <OrderContents orderList={this.props.eventOrderList} />
          <h3>User orders</h3>
          <OrderContents
            orderList={this.getUserEvents()}
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
