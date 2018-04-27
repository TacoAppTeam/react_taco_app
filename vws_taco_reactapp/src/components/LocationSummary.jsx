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
import {styles} from '../index';

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
    eventOrderList: state.order.currentEventOrders,
    eventOrderListPending: state.order.pending,
    eventData: state.event.eventData,
    eventsPending: state.event.eventsPending
  };
}

class LocationSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      redirect: false
    };
  }

  componentDidMount() {
    this.props.dispatch(Actions.locations.fetchLocations());
  }

  getLocationData = () => {
    let locationData = {};
    let locationId = parseInt(this.props.match.params.event, 10);

    locationData = this.props.locationData.find(function(location) {
      return location.id === locationId;
    });

    if (locationData) {
      return locationData;
    }

    return {};
  };

  getLocationName = () => {
    return 'this restaurants';
  }

  closeModal = () => {
    this.setState({showModal: false});
  };

  openModal = () => {
    this.setState({showModal: true});
  };

  deleteLocation = () => {
    if (
      window.confirm(
        'You can\'t delete this location if there are any orders pending. so I guess there aren\'t any orders pending.'
      )
    ) {
      let locationData = {locationId: this.props.match.params.location};
      this.props.dispatch(Actions.locations.deleteLocation(locationData));
      this.setState({redirect: true});
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to={'/locationmgmt'} />;
    }
    return (
      <Loader loaded={!this.props.eventOrderListPending && !this.props.eventsPending}>
        <div className="eventSummary">
          <h2>{this.getLocationName()}</h2>
          <RaisedButton style={styles.button} onClick={this.deleteLocation} label="Delete Location" />
          <div>
            <h3>Address</h3>

          </div>
          <div>
            <h3>Phone</h3>

          </div>
          <div>
            <h3>Hours</h3>

          </div>
          <div>
            <h3>Ingredients</h3>

          </div>
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

export default connect(mapStateToProps)(LocationSummary);
