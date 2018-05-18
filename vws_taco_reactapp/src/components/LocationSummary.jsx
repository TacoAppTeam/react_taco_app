import React, {Component} from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Actions} from '../store';
import Loader from 'react-loader';
import {Redirect} from 'react-router';
import {styles} from '../index';

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
    locations: state.location.locations,
  };
}

class LocationSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      redirect: false,
      location: {},
    };
  }

  componentDidMount() {
    this.props.dispatch(Actions.location.fetchLocations());
    let thisLocation = this.getLocationData();
    this.setState({
      location: thisLocation,
    })
    console.log(thisLocation);
  }

  getLocationData = () => {
    let locationData = {};
    let locationId = parseInt(this.props.match.params.location, 10);

    locationData = this.props.locations.find(function(location) {
      return location.id === locationId;
    });

    if (locationData) {
      return locationData;
    }

    return {};
  };

  getLocationName = () => {
    return this.state.location.name;
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
        "Did they close or something? That's too bad.."
      )
    ) {
      let locationData = {locationId: this.props.match.params.location};
      this.props.dispatch(Actions.location.deleteLocation(locationData));
      this.setState({redirect: true});
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to={'/locationmgmt'} />;
    }
    return (
      <Loader loaded={!this.props.eventOrderListPending && !this.props.eventsPending}>
        <div className="locationSummary">
          <h2>{this.state.location.name}</h2>
          <div>
            <h3>Address</h3>
            <h4>{this.state.location.street_address}</h4>
            <h4>{this.state.location.city}</h4>
            <h4>{this.state.location.state}</h4>
            <h4>{this.state.location.zip}</h4>
          </div>
          <div>
            <h3>Phone</h3>
            <h4>{this.state.location.phone_number}</h4>
          </div>
          <div>
            <h3>Hours</h3>
            <h4>{this.state.location.hours}</h4>
          </div>
          <div>
            <h3>Ingredients</h3>

          </div>

          <RaisedButton style={styles.button} onClick={this.deleteLocation} label="Delete Location" />
          {/* <TacoModal showModal={this.state.showModal} title="Order Builder" close={this.closeModal}>
            <OrderBuilder
              eventId={this.props.match.params.event}
              submitOrderFinished={this.closeModal}
            />
          </TacoModal> */}
        </div>
      </Loader>
    );
  }
}

export default connect(mapStateToProps)(LocationSummary);
