import React, { Component } from 'react';
import Header from './Header';

export default class Events extends Component {
  render() {
    return (
      <div className="events">
        <h4>Upcoming Events</h4>
        <p>Add a table in here</p>
        <button>Create Event</button>
      </div>
    );
  }
}
