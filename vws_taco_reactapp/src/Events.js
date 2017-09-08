import React, { Component } from 'react';
import DataGrid from 'react-datagrid';
import sorty from 'sorty';
import Request from 'react-http-request';
import { config } from './config.js';

class TacoRequest extends Component {
}

export default class Events extends Component {
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

              // Not using this right now
              function onSortChange(info){
                sortInfo = info
                data = sort(data)
                //now refresh the grid
              }

              data = sort(data)

              return (
                <div className="events">
                  <h4>Upcoming Events</h4>
                  <DataGrid idProperty="id" dataSource={data} columns={columns}></DataGrid>
                  <button>Create Event</button>
                </div>
              );

            }
          }
        }
      </Request>
    );
  }
}
