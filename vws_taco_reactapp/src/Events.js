import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import DataGrid from 'react-datagrid';
import sorty from 'sorty';
import Request from 'react-http-request';
import { config } from './config.js';
import TacoModal from './TacoModal.js';
import EventForm from './EventForm.js';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      eventData: [],
      users: []
    };
  };

  createEvent = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  // TODO: Have submit save event
  submit = (formData) => {
    console.log(formData);
    this.closeModal();
  };

  componentDidMount = () => {
    // Get Event Data
    const event_url = config.api_hostname + ':' + config.api_port + '/v1/events';
    axios.get(event_url).then(res => {
      for (var data of res.data) {
        var event = {};
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
    axios.get(user_url).then(res => {
      for (var user of res.data) {
        var user = {};
        this.state.users.push(user);
      }

      this.setState({'eventData': this.state.eventData});

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
        <DataGrid idProperty="id" dataSource={this.state.eventData} columns={columns} rowProps={ { onClick: handleRowClick } }></DataGrid>
        <button onClick={this.createEvent}>Create Event</button>
        <TacoModal title="Create Event" body={<EventForm submit={this.submit}/>}
                   showModal={this.state.showModal} close={this.closeModal}>
        </TacoModal>
      </div>
    );
  }
}

