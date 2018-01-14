import React, {Component} from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';
import {config} from '../config.js';
import TacoModal from './TacoModal.js';
import EventForm from './EventForm.js';
import Loader from 'react-loader';
import {connect} from 'react-redux';
import {Actions} from '../store';
import ReactDataGrid from 'react-data-grid';

// const ReactDataGrid = require('react-data-grid');

function mapStateToProps(state) {
  return {
    eventData: state.event.eventData,
    eventsPending: state.event.eventsPending,
    users: state.user.users,
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
      loaded: false
    };
  }

  createEvent = () => {
    this.setState({showModal: true});
  };

  closeModal = () => {
    this.setState({showModal: false});
  };

  submit = formData => {
    console.log(formData);
    this.props.dispatch(Actions.event.createEvent(formData));
    this.closeModal();
  };

  componentDidMount = () => {
    // Get Event Data
    this.props.dispatch(Actions.event.fetchEvents());

    // Get User Data
    this.props.dispatch(Actions.user.fetchUsers());

    // Get Location Data
    this.props.dispatch(Actions.location.fetchLocations());
  };

  render() {
    const columns = [
      {key: 'date', name: 'date'},
      {key: 'locationName', name: 'locationName'},
      {key: 'firstName', name: 'firstName'},
      {key: 'lastName', name: 'lastName'}
    ];

    function handleRowClick(rowIndex) {
      const row = this.props.eventData[rowIndex];
      browserHistory.push('/order-builder?event=' + row.id);
    }

    function rowGetter(i) {
      return this.props.eventData[i];
    }

    return (
      <div className="events">
        <h4>Upcoming Events</h4>
        <Loader
          loaded={
            !this.props.eventsPending &&
            !this.props.locationsPending &&
            !this.props.usersPending
          }
        >
          <div>
            <ReactDataGrid
              columns={columns}
              rowGetter={rowGetter.bind(this)}
              rowsCount={this.props.eventData ? this.props.eventData.length : 0}
              onRowClick={handleRowClick.bind(this)}
            />
          </div>
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
