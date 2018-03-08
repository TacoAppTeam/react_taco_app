import React, {Component} from 'react';
import TacoModal from './TacoModal.js';
import EventForm from './EventForm.js';
import Loader from 'react-loader';
import {connect} from 'react-redux';
import {Actions} from '../store';
import EventGrid from './EventGrid.js';
import {dateFormat} from '../utils/format';

function mapStateToProps(state) {
  return {
    eventData: state.event.eventData,
    eventsPending: state.event.eventsPending,
    users: state.user.list,
    usersPending: state.user.usersPending,
    locations: state.location.locations,
    locationsPending: state.location.locationsPending,
    eventCreatePending: state.event.eventCreatePending,
    eventCreateResponse: state.event.eventCreateResponse
  };
}

class Events extends Component {
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
    this.props.dispatch(Actions.event.createEvent(formData));
    this.closeModal();
  };

  render() {
    const columns = [
      {
        key: 'date',
        name: 'date',
        formatter: dateFormat
      },
      {key: 'locationName', name: 'locationName'},
      {key: 'firstName', name: 'firstName'},
      {key: 'lastName', name: 'lastName'}
    ];

    return (
      <div className="events">
        <h4>Upcoming Events</h4>
        <Loader
          loaded={
            !this.props.eventsPending && !this.props.locationsPending && !this.props.usersPending
          }
        >
          <EventGrid columns={columns} eventData={this.props.eventData} />
          <span>
            <button onClick={this.createEvent}>Create Event</button>
          </span>
          <TacoModal showModal={this.state.showModal} close={this.closeModal}>
            <EventForm
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

export default connect(mapStateToProps)(Events);
