import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import DataGrid from 'react-datagrid';
import sorty from 'sorty';
import { config } from './config.js';
import TacoModal from './TacoModal.js';
import EventForm from './EventForm.js';
import Loader from 'react-loader'

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      eventData: [],
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
    const event_url = config.api_hostname + ':' + config.api_port + '/v1/events';
    let events_promise = axios.get(event_url).then(res => {
      for (let data of res.data) {
        let event = {};
        event.date = data.event.event_date;
        event.locationName = data.location.name;
        event.firstName = data.user.first_name;
        event.lastName = data.user.last_name;
        event.id = data.event.id;
        this.state.eventData.push(event);
      }

      this.setState({'eventData': this.state.eventData});
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

    Promise.all([events_promise, users_promise, locations_promise]).then(res => {
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

    let sortInfo = [{name: 'firstName', dir: 'asc'}];

    function sort(arr){
      return arr ? sorty(sortInfo, arr) : arr;
    }

    // Not using this right now
    function onSortChange(info){
      sortInfo = info
      this.setState({'eventData': sort(this.state.eventData)});
      //now refresh the grid
    }

    function handleRowClick(evt) {
      browserHistory.push('/order-builder?event=' + this.data.id);
    }

    return (
      <div className="events">
        <h4>Upcoming Events</h4>
        <Loader loaded={this.state.loaded}>
          <DataGrid idProperty="id" dataSource={this.state.eventData} columns={columns} rowProps={ { onClick: handleRowClick } }></DataGrid>
          <button onClick={this.createEvent}>Create Event</button>
          <TacoModal title="Create Event" body={<EventForm users={this.state.users} locations={this.state.locations}
                     submit={this.submit}/>} showModal={this.state.showModal} close={this.closeModal}>
          </TacoModal>
        </Loader>
      </div>
    );
  }
}

