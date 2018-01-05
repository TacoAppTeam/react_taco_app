import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import DataGrid from 'react-datagrid';
import { config } from '../config.js';
import TacoModal from './TacoModal.js';
import EventForm from './EventForm.js';
import Loader from 'react-loader';
import { connect } from "react-redux";

function mapStateToProps(state) {
    return {
        eventData: state.eventData
    }
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
  };

  createEvent = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  submit = (formData) => {
    console.log(formData);

    const event_post_url = config.api_hostname + ':' + config.api_port + '/v1/event';
    axios.post(event_post_url, formData).then(res => {
      console.log(res);
    });

    this.closeModal();
  };

  componentDidMount = () => {
    // Get Event Data
    this.props.dispatch({
        type: 'GET_EVENT_DATA'
    });

    // Get User Data
    const user_url = config.api_hostname + ':' + config.api_port + '/v1/users';
    let users_promise = axios.get(user_url).then(res => {
      this.setState({'users': res.data});
    });

    // Get Location Data
    const location_url = config.api_hostname + ':' + config.api_port + '/v1/locations';
    let locations_promise = axios.get(location_url).then(res => {
      this.setState({'locations': res.data});
    });

    Promise.all([users_promise, locations_promise]).then(res => {
      this.setState({'loaded': true});
    });
  };

  render() {
    const columns = [
      { name: 'date'},
      { name: 'locationName'},
      { name: 'firstName'},
      { name: 'lastName'}
    ];

    function handleRowClick(evt) {
      browserHistory.push('/order-builder?event=' + this.data.id);
    }

    return (
      <div className="events">
        <h4>Upcoming Events</h4>
        <Loader loaded={this.state.loaded}>
          <DataGrid idProperty="id" dataSource={this.state.eventData} columns={columns} rowProps={ { onClick: handleRowClick } }></DataGrid>
          <button onClick={this.createEvent}>Create Event</button>
          <TacoModal
              showModal={this.state.showModal}
              close={this.closeModal}
          >
            <EventForm users={this.state.users} submit={this.submit} locations={this.state.locations} />
          </TacoModal>
        </Loader>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Events)
