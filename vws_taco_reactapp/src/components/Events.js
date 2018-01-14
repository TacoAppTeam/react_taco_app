import React, {Component} from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';
import DataGrid from 'react-datagrid';
import {config} from '../config.js';
import TacoModal from './TacoModal.js';
import EventForm from './EventForm.js';
import Loader from 'react-loader';
import {connect} from 'react-redux';
import {Actions} from '../store';

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
      {name: 'date'},
      {name: 'locationName'},
      {name: 'firstName'},
      {name: 'lastName'}
    ];

    function handleRowClick(evt) {
      browserHistory.push('/order-builder?event=' + this.data.id);
    }

    return (
      <div className="events">
        <h4>Upcoming Events</h4>
        <Loader loaded={!this.props.eventsPending && !this.props.locationsPending && !this.props.usersPending}>
          <DataGrid
            idProperty="id"
            dataSource={this.props.eventData}
            columns={columns}
            rowProps={{onClick: handleRowClick}}
          />
          <button onClick={this.createEvent}>Create Event</button>
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
