import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

export default class LocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      basePrice: '',
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
        <TextField
          name="base_taco_price"
          placeholder="Base Taco Price"
          type="text"
          value={this.state.basePrice}
          onChange={(e, idx, val) => {
            handleChange('name', val);
          }}
        />
      </form>
    );
  }
}
