import React, {Component} from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import OrderContents from './OrderContents';
import {Actions} from '../store';
import Loader from 'react-loader';
import TacoModal from './TacoModal';
import OrderBuilder from './OrderBuilder';
import {dateFormat} from '../utils/format';
import {Redirect} from 'react-router';

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
    this.state = {
      showModal: false,
      redirect: false
    };
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

  getEventRunner = () => {
    let eventData = this.getEventData();

    if (Object.keys(eventData).length) {
      return eventData.userId;
    }

    return '';
  };

  getUserEvents = () => {
    let user = this.props.currentUser;

    return this.props.eventOrderList.length
      ? this.props.eventOrderList.filter(function(order) {
          return user && order.user_id === user.email;
        })
      : null;
  };

  showAllOrders = () => {
    return this.props.currentUser && this.props.currentUser.email === this.getEventRunner();
  };

  closeModal = () => {
    this.setState({showModal: false});
  };

  deleteTaco = taco => {
    this.props.dispatch(Actions.order.removeTaco(taco.taco_id));
  };

  openModal = () => {
    this.setState({showModal: true});
  };

  deleteEvent = () => {
    if (
      window.confirm(
        'Whoah now, this is gonna delete this event aaaand all the orders.. Are you sure you want to kill these tacos?'
      )
    ) {
      let eventData = {eventId: this.props.match.params.event};
      this.props.dispatch(Actions.event.deleteEvent(eventData));
      this.setState({redirect: true});
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to={'/'} />;
    }
    const currentRunner = this.getEventRunner();
    const isUserRunner = currentRunner === this.props.currentUser.email;
    return (
      <Loader loaded={!this.props.eventOrderListPending && !this.props.eventsPending}>
        <div className="eventSummary">
          <h2>Date of Event: {this.getEventDate()}</h2>
          <h3>
            Runner for event:{' '}
            {isUserRunner
              ? 'YOU are the runner, it is YOU!!! ... do not forget the green sauce.'
              : currentRunner}
          </h3>
          {this.showAllOrders() ? (
            <div>
              <h3>All event orders</h3>
              <OrderContents
                isUserRunner
                orderList={this.props.eventOrderList.length ? this.props.eventOrderList : null}
              />
            </div>
          ) : null}
          <div>
            <h3>User orders</h3>
            <OrderContents orderList={this.getUserEvents()} handleDeleteTaco={this.deleteTaco} />
          </div>
          <RaisedButton onClick={this.openModal} label="Order Tacos" />
          <RaisedButton onClick={this.deleteEvent} label="Delete Event" />
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
