import React, {Component} from 'react';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';

import {getNextDayOfWeek} from '../utils/helpers';

export default class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventUser: undefined,
      eventLocation: undefined,
      eventDate: getNextDayOfWeek(new Date(), 5)
    };
  }

  submit = () => {
    let formData = {};

    formData.user_id = this.state.eventUser;
    formData.location_id = this.state.eventLocation;
    formData.event_date = this.state.eventDate;
    this.props.submit(formData);
  };

  render() {
    const handleChange = (which, newVal) => {
      let partialState = {
        ...this.state
      };
      partialState[which] = newVal;
      this.setState(partialState);
    };
    return (
      <form onSubmit={this.submit}>
        <SelectField
          onChange={(e, idx, val) => {
            handleChange('eventUser', val);
          }}
          value={this.state.eventUser}
          floatingLabelText="Runner"
        >
          {this.props.users.map(user => (
            <MenuItem
              key={user.email}
              value={user.email}
              primaryText={`${user.first_name} ${user.last_name}`}
            />
          ))}
        </SelectField>

        <SelectField
          floatingLabelText="Location"
          value={this.state.eventLocation}
          onChange={(e, idx, val) => {
            handleChange('eventLocation', val);
          }}
        >
          {this.props.locations.map(loc => (
            <MenuItem key={loc.id} value={loc.id} primaryText={loc.name} />
          ))}
        </SelectField>

        <DatePicker
          floatingLabelText="Event date"
          id="event-datepicker"
          value={this.state.eventDate}
          onChange={(e, val) => {
            handleChange('eventDate', val);
          }}
          locale="us-en"
        />

        <RaisedButton label="Submit" type="submit" primary />
      </form>
    );
  }
}
