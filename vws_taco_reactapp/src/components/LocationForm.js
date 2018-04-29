import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

export default class LocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      basePrice: '',
      street_address: '',
      city: '',
      state: '',
      zip: '',
      phone_number: '',
      hours: '',
    };
  }

  submit = () => {
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
        <TextField
          name="name"
          placeholder="Name"
          type="text"
          value={this.state.name}
          onChange={(e, idx, val) => {
            handleChange('name', val);
          }}
        />
        <br />
        <TextField
          name="street_address"
          placeholder="Street Address"
          type="text"
          value={this.state.street_address}
          onChange={(e, idx, val) => {
            handleChange('street_address', val);
          }}
        />
        <br />
        <TextField
          name="city"
          placeholder="City"
          type="text"
          value={this.state.city}
          onChange={(e, idx, val) => {
            handleChange('city', val);
          }}
        />
        <br />
        <TextField
          name="state"
          placeholder="State"
          type="text"
          value={this.state.state}
          onChange={(e, idx, val) => {
            handleChange('state', val);
          }}
        />
        <br />
        <TextField
          name="zip"
          placeholder="Zip Code"
          type="text"
          value={this.state.zip}
          onChange={(e, idx, val) => {
            handleChange('zip', val);
          }}
        />
        <br />
        <TextField
          name="phone_number"
          placeholder="Phone Number"
          type="text"
          value={this.state.phone_number}
          onChange={(e, idx, val) => {
            handleChange('phone_number', val);
          }}
        />
        <br />
        <TextField
          name="hours"
          placeholder="Hours"
          type="text"
          value={this.state.hours}
          onChange={(e, idx, val) => {
            handleChange('hours', val);
          }}
        />
        <br />
        <TextField
          name="base_taco_price"
          placeholder="Base Taco Price"
          type="text"
          value={this.state.basePrice}
          onChange={(e, idx, val) => {
            handleChange('base_taco_price', val);
          }}
        />
        <br />
      </form>
    );
  }
}
