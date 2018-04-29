import React, {Component} from 'react';
import TacoModal from './TacoModal';
import LocationForm from './LocationForm';
import Loader from 'react-loader';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Actions} from '../store';
import LocationGrid from './LocationGrid';

function mapStateToProps(state) {
  return {
    eventData: state.event.eventData,
    eventsPending: state.event.eventsPending,
    users: state.user.list,
    usersPending: state.user.usersPending,
    locations: state.location.locations,
    locationsPending: state.location.locationsPending
  };
}

class LocationMgmt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      users: [],
      locations: [],
      loaded: false,
      originalRows: []
    };
  }

  componentDidMount = () => {
    // Get Event Data
    this.props.dispatch(Actions.event.fetchEvents());

    // Get User Data
    this.props.dispatch(Actions.user.fetchUsers());

    // Get Location Data
    this.props.dispatch(Actions.location.fetchLocations());
  };

  closeModal = () => {
    this.setState({showModal: false});
  };

  createEvent = () => {
    this.setState({showModal: true});
  };

  submit = formData => {
    console.log(formData);
    this.props.dispatch(Actions.location.createLocation(formData));
    this.closeModal();
  };

  render() {
    const columns = [
      {key: 'name', name: 'Name'},
      {key: 'street_address', name: 'Address'},
      {key: 'phone_number', name: 'Phone Number'},
      {key: 'hours', name: 'Hours'},
    ];

    return (
      <div className="locations">
        <h3>Locations</h3>
        <Loader
          loaded={
            !this.props.eventsPending && !this.props.locationsPending && !this.props.usersPending
          }
        >
          <LocationGrid
            columns={columns}
            locationData={this.props.locations}
          />
          <br />

          <RaisedButton onClick={this.createEvent} label="Create Location" />

          <TacoModal showModal={this.state.showModal} close={this.closeModal} title='Create Location'>
            <LocationForm
              users={this.props.users}
              submit={this.submit}
              locations={this.props.locations}
            />
          </TacoModal>
        </Loader>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LocationMgmt);
