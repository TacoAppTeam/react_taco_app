import React, { Component } from 'react';
import DataGrid from 'react-datagrid';
import sorty from 'sorty';

export default class Events extends Component {
  render() {
    let data = [
      { id: '1', firstName: 'John', lastName: 'Bobson'},
      { id: '2', firstName: 'Bob', lastName: 'Mclaren'}
    ];

    const columns = [
      { name: 'firstName'},
      { name: 'lastName'}
    ];

    let sortInfo = [{name: 'firstName', dir: 'asc'}]

    function sort(arr){
      return sorty(sortInfo, arr)
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
