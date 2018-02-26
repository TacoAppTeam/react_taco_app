import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import DatePicker from 'react-bootstrap-date-picker';

export default class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventDate: ''
    };
  }

  submit = () => {
    let formData = {};
    formData.user_id = ReactDOM.findDOMNode(this.userSelect).value;
    formData.location_id = ReactDOM.findDOMNode(this.locationSelect).value;
    formData.event_date = this.state.eventDate;
    this.props.submit(formData);
  };

  handleDateChange = (value, formattedValue) => {
    let eventDate = new Date(value);
    eventDate.setHours(8);
    eventDate.setMinutes(0);
    eventDate.setSeconds(0);
    eventDate.setMilliseconds(0);
    eventDate = eventDate.toISOString();
    console.log(eventDate);
    this.setState({eventDate: eventDate});
  };

  componentDidMount = () => {
    function getNextDayOfWeek(date, dayOfWeek) {
      if (date.getDay() === dayOfWeek) {
        date.setDate(date.getDate() + 1);
      }

      let resultDate = new Date(date.getTime());

      resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);

      return resultDate;
    }

    let today = new Date();
    today.setHours(8);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    let eventDate = getNextDayOfWeek(today, 5).toISOString();
    this.setState({eventDate: eventDate});
  };

  render() {
    let userSelects = [];

    for (let i = 0; i < this.props.users.length; i++) {
      let user = this.props.users[i];
      userSelects.push(<option value={user.email}>{user.email}</option>);
    }

    let locationSelects = [];

    for (let j = 0; j < this.props.locations.length; j++) {
      let location = this.props.locations[j];
      locationSelects.push(<option value={location.id}>{location.name}</option>);
    }

    return (
      <div>
        <form onSubmit={this.submit}>
          <FormGroup controlId="userSelect">
            <ControlLabel>Runner</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              ref={select => {
                this.userSelect = select;
              }}
            >
              {userSelects}
            </FormControl>
          </FormGroup>

          <FormGroup controlId="locationSelect">
            <ControlLabel>Location</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              ref={select => {
                this.locationSelect = select;
              }}
            >
              {locationSelects}
            </FormControl>
          </FormGroup>

          <FormGroup>
            <ControlLabel>Event Date</ControlLabel>
            <DatePicker
              id="event-datepicker"
              value={this.state.eventDate}
              onChange={this.handleDateChange}
            />
          </FormGroup>

          <Button bsStyle="primary" onClick={this.submit}>
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
