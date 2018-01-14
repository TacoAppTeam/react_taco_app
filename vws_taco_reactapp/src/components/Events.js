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
    eventData: state.event.eventData
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

    const event_post_url =
      config.api_hostname + ':' + config.api_port + '/v1/event';
    axios.post(event_post_url, formData).then(res => {
      console.log(res);
    });

    this.closeModal();
  };

  componentDidMount = () => {
    // Get Event Data
    this.props.dispatch(Actions.event.fetchEvents());

    // Get User Data
    const user_url = config.api_hostname + ':' + config.api_port + '/v1/users';
    let users_promise = axios.get(user_url).then(res => {
      this.setState({users: res.data});
    });

    // Get Location Data
    const location_url =
      config.api_hostname + ':' + config.api_port + '/v1/locations';
    let locations_promise = axios.get(location_url).then(res => {
      this.setState({locations: res.data});
    });

    Promise.all([users_promise, locations_promise]).then(res => {
      this.setState({loaded: true});
    });
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
        <Loader loaded={this.state.loaded}>
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
              users={this.state.users}
              submit={this.submit}
              locations={this.state.locations}
            />
          </TacoModal>
        </Loader>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Events);
