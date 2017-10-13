import React, { Component } from 'react';
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
      showModal: false
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
  }

  render() {

    return (
      <Request
        url={config.api_hostname + ':' + config.api_port + '/v1/events'}
        method='get'
        accept='application/json'
        verbose={true}
        mode='no-cors'
      >
        {
          ({error, result, loading}) => {
            if (loading) {
              return <div>loading...</div>;
            } else {
              let body = result && result.body;

              let data = [];
              for(var eventData of body) {
                var event = {};
                event.date = eventData.event.event_date;
                event.locationName = eventData.location.name;
                event.firstName = eventData.user.first_name;
                event.lastName = eventData.user.last_name;
                event.id = eventData.event.id;
                data.push(event);
              }

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

              data = sort(data)

              function handleRowClick(evt) {
                browserHistory.push('/order-builder?event=' + this.data.id);
              }

              return (
                <div className="events">
                  <h4>Upcoming Events</h4>
                  <DataGrid idProperty="id" dataSource={data} columns={columns} rowProps={ { onClick: handleRowClick } }></DataGrid>
                  <button onClick={this.createEvent}>Create Event</button>
                  <TacoModal title="Create Event" body={<EventForm submit={this.submit}/>}
                             showModal={this.state.showModal} close={this.closeModal}>
                  </TacoModal>
                </div>
              );

            }
          }
        }
      </Request>
    );
  }
}

