import React, {Component} from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
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
      location: {}
    };
  }

  componentDidMount() {
    this.props.dispatch(Actions.location.fetchLocations());
    let thisLocation = this.getLocationData();

    this.setState({
      location: thisLocation
    });
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
  };

  closeModal = () => {
    this.setState({showModal: false});
  };

  openModal = () => {
    this.setState({showModal: true});
  };

  deleteLocation = () => {
    if (window.confirm("Did they close or something? That's too bad..")) {
      let locationData = {locationId: this.props.match.params.location};
      this.props.dispatch(Actions.location.deleteLocation(locationData));
      this.setState({redirect: true});
    }
  };

  handleChange = (property, which, idx, val) => {
    const effectedProp = this.state.location[property];
    if (Array.isArray(effectedProp)) {
      effectedProp[idx][which] = val;
      this.setState({effectedProp, dirty: true});
    } else {
      const newState = this.state.location;
      newState[property] = val;
      this.setState({location: newState, dirty: true});
    }
  };

  render() {
    const {eventOrderListPending, eventsPending, locationDeletePending} = this.props;

    const {redirect, location} = this.state;

    if (redirect && !locationDeletePending) {
      return <Redirect push to={'/locationmgmt'} />;
    }
    return (
      <Loader loaded={!eventOrderListPending && !eventsPending}>
        <div className="locationSummary">
          <h2>
            {this.state.isEditingLocation ? (
              <TextField
                name="name"
                type="string"
                style={{
                  width: 250,
                  fontSize: 25,
                  fontStyle: 'bold',
                  textAlign: 'right'
                }}
                value={location.name}
                onChange={(e, val) => this.handleChange('name', null, null, val)}
              />
            ) : (
              <span>{location.name}</span>
            )}
          </h2>
          <div>
            <h3>Address</h3>
            {this.state.isEditingLocation ? (
              <div>
                <TextField
                  name="street_add"
                  type="string"
                  style={{
                    width: 180,
                    textAlign: 'right'
                  }}
                  value={location.street_address}
                  onChange={(e, val) => this.handleChange('street_address', null, null, val)}
                />
                <br />
                <TextField
                  name="city"
                  type="string"
                  style={{
                    width: 180,
                    textAlign: 'right'
                  }}
                  value={location.city}
                  onChange={(e, val) => this.handleChange('city', null, null, val)}
                />
                <TextField
                  name="state"
                  type="string"
                  style={{
                    width: 180,
                    textAlign: 'right'
                  }}
                  value={location.state}
                  onChange={(e, val) => this.handleChange('state', null, null, val)}
                />
                <TextField
                  name="zip"
                  type="number"
                  style={{
                    width: 180,
                    textAlign: 'right'
                  }}
                  value={location.zip}
                  onChange={(e, val) => this.handleChange('zip', null, null, val)}
                />
              </div>
            ) : (
              <div>
                <span>{location.street_address}</span>
                <br />
                <span>{location.city + ', ' + location.state + ' ' + location.zip}</span>
              </div>
            )}
          </div>
          <div>
            <h3>Phone</h3>
            {this.state.isEditingLocation ? (
              <TextField
                name="phone"
                type="string"
                style={{
                  width: 90,
                  textAlign: 'right'
                }}
                value={location.phone_number}
                onChange={(e, val) => this.handleChange('phone_number', null, null, val)}
              />
            ) : (
              <span>{location.phone_number}</span>
            )}
          </div>
          <div>
            <h3>Hours</h3>
            {this.state.isEditingLocation ? (
              <TextField
                name="hours"
                type="string"
                style={{
                  width: 90,
                  textAlign: 'right'
                }}
                value={location.hours}
                onChange={(e, val) => this.handleChange('hours', null, null, val)}
              />
            ) : (
              <span>{location.hours}</span>
            )}
          </div>
          <div>
            <h3>Base Price</h3>
            {this.state.isEditingLocation ? (
              <TextField
                name="base_price"
                type="number"
                style={{
                  width: 45,
                  textAlign: 'right'
                }}
                value={location.base_taco_price}
                onChange={(e, val) => this.handleChange('base_taco_price', null, null, val)}
              />
            ) : (
              <span>${location.base_taco_price}</span>
            )}
          </div>
          <div>
            <h3>Ingredients</h3>
            {this.state.isEditingLocation ? (
              <RaisedButton
                style={styles.button}
                onClick={() => {
                  const newState = this.state.location;
                  newState.ingredients.push({
                    name: 'New Ingredient',
                    price: 0.0,
                    location_id: this.state.location.id
                  });
                  this.setState({location: newState});
                }}
                label="Add an ingredient"
              />
            ) : null}
            <ul>
              {location.ingredients &&
                location.ingredients.map((ing, key) => {
                  if (this.state.isEditingLocation) {
                    return (
                      <li key={key}>
                        <TextField
                          name="ingredient_name"
                          type="string"
                          style={{
                            width: 90,
                            textAlign: 'right'
                          }}
                          value={ing.name}
                          onChange={(e, val) => this.handleChange('ingredients', 'name', key, val)}
                        />{' '}
                        -{' '}
                        <TextField
                          name="ingredient_price"
                          type="number"
                          style={{
                            width: 45,
                            textAlign: 'right'
                          }}
                          value={ing.price}
                          onChange={(e, val) => this.handleChange('ingredients', 'price', key, val)}
                        />
                      </li>
                    );
                  } else {
                    return (
                      <li key={key}>
                        {ing.name} - ${ing.price}
                      </li>
                    );
                  }
                })}
            </ul>
          </div>
          <RaisedButton
            style={styles.button}
            onClick={this.deleteLocation}
            label="Delete Location"
          />{' '}
          <RaisedButton
            style={styles.button}
            primary={true}
            label={this.state.isEditingLocation ? 'SAVE' : 'EDIT'}
            onClick={() => {
              if (this.state.isEditingLocation && this.state.dirty) {
                this.props.dispatch(Actions.location.updateLocation(this.state.location));
                this.setState({dirty: false});
              }
              this.setState({isEditingLocation: !this.state.isEditingLocation});
            }}
          />
        </div>
      </Loader>
    );
  }
}

export default connect(mapStateToProps)(LocationSummary);
