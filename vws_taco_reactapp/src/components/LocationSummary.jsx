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
    locationDeletePending: state.location.locationDeletePending
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
    // console.log(thisLocation);
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
    const {
      eventOrderListPending,
      eventsPending,
      locationDeletePending,
    } = this.props

    const {
      redirect,
      location,
    } = this.state

    if (redirect && !locationDeletePending) {
      return <Redirect push to={'/locationmgmt'} />;
    }
    return (
      <Loader loaded={!eventOrderListPending && !eventsPending}>
        <div className="locationSummary">
          <h2>{this.state.location.name}</h2>
          <div>
            <h3>Address</h3>
            <span>{location.street_address}</span>
            <br/>
            <span>{location.city + ", " + location.state + " " + location.zip}</span>
          </div>
          <div>
            <h3>Phone</h3>
            <span>{location.phone_number}</span>
          </div>
          <div>
            <h3>Hours</h3>
            <span>{location.hours}</span>
          </div>
          <div>
            <h3>Ingredients</h3>
            {location.ingredients &&
                  location.ingredients.map((ing, key) => (
                    <li key={key}>{ing.name}</li>
                    ))}
          </div>

          <RaisedButton style={styles.button} onClick={this.deleteLocation} label="Delete Location" />
        </div>
      </Loader>
    );
  }
}

export default connect(mapStateToProps)(LocationSummary);
