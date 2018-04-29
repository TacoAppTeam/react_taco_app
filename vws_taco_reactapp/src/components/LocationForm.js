import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class LocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      streetAddress: '',
      city: '',
      state: '',
      zip: '',
      phoneNumber: '',
      hours: '',
      baseTacoPrice: 0,
    };
  }

  onChange = (evt, which) => {
    var val = evt.currentTarget.value;
    let newState = {};
    newState[which] = val;
    this.setState(newState);
  };

  submit = (evt) => {
    evt.preventDefault();

    let formData = {};

    formData.name = this.state.name;
    formData.street_address = this.state.streetAddress;
    formData.city = this.state.city;
    formData.state = this.state.state;
    formData.zip = this.state.zip;
    formData.phone_number = this.state.phoneNumber;
    formData.hours = this.state.hours;
    formData.base_taco_price = this.state.baseTacoPrice;
    this.props.submit(formData);
  };

  render() {
    return (
      <form onSubmit={this.submit}>
        <TextField
          name="name"
          placeholder="Name"
          type="text"
          value={this.state.name}
          onChange={e => this.onChange(e, 'name')}
        />
        <br />
        <TextField
          name="streetAddress"
          placeholder="Street Address"
          type="text"
          value={this.state.streetAddress}
          onChange={e => this.onChange(e, 'streetAddress')}
        />
        <br />
        <TextField
          name="city"
          placeholder="City"
          type="text"
          value={this.state.city}
          onChange={e => this.onChange(e, 'city')}
        />
        <br />
        <TextField
          name="state"
          placeholder="State"
          type="text"
          value={this.state.state}
          onChange={e => this.onChange(e, 'state')}
        />
        <br />
        <TextField
          name="zip"
          placeholder="Zip Code"
          type="text"
          value={this.state.zip}
          onChange={e => this.onChange(e, 'zip')}
        />
        <br />
        <TextField
          name="phoneNumber"
          placeholder="Phone Number"
          type="text"
          value={this.state.phoneNumber}
          onChange={e => this.onChange(e, 'phoneNumber')}
        />
        <br />
        <TextField
          name="hours"
          placeholder="Hours"
          type="text"
          value={this.state.hours}
          onChange={e => this.onChange(e, 'hours')}
        />
        <br />
        <TextField
          name="baseTacoPrice"
          placeholder="Base Taco Price"
          type="text"
          value={this.state.baseTacoPrice}
          onChange={e => this.onChange(e, 'baseTacoPrice')}
        />
        <br />

        <RaisedButton label="Submit" type="submit" primary />
      </form>
    );
  }
}
