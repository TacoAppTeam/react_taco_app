import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';

export default class LocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      streetAddress: '',
      city: '',
      state: 'Texas',
      zip: '',
      phoneNumber: '',
      hours: '',
      baseTacoPrice: 0,
      nameErrorText: '',
      zipErrorText: '',
      phoneNumberErrorText: '',
      baseTacoPriceErrorText: '',
      ingredientList: [],
    };
  }

  onChange = (evt, which) => {
    var val = evt.currentTarget.value;
    let newState = {};
    newState[which] = val;
    this.setState(newState, this.validateForm);
  };

  validateInt = (value, length) => {
    if (value) {
      if (isNaN(value)) {
        return false;
      }

      if (length && value.length !== length) {
        return false;
      }
    }

    return true;
  };

  validateForm = () => {
    let newState = {};

    newState.nameErrorText = this.state.name ? '' : 'Name is a required field';
    newState.zipErrorText = this.validateInt(this.state.zip, 5) ? '' : 'Zip code must be an integer of length 5';
    newState.phoneNumberErrorText = this.validateInt(this.state.phoneNumber, 10) ? '' : 'Phone number must be an integer of length 10';

    if (this.state.baseTacoPrice !== '') {
      newState.baseTacoPriceErrorText = this.validateInt(this.state.baseTacoPrice) ? '' : 'Base taco price must be an integer';
    } else {
      newState.baseTacoPriceErrorText = 'Base taco price is required';
    }

    this.setState(newState);

    if (!newState.nameErrorText && !newState.zipErrorText
        && !newState.phoneNumberErrorText && !newState.baseTacoPriceErrorText) {

      return true;
    }

    return false;
  };

  submit = (evt) => {
    evt.preventDefault();

    if (this.validateForm()) {
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
    }
  };

  addIngredient = () => {
    let newIngredientList = this.state.ingredientList;
    newIngredientList.push({name: '', price: 0});
    this.setState({ingredientList: newIngredientList});
  };

  removeIngredient = (index) => {
    console.log(index);
    let newIngredientList = this.state.ingredientList;
    newIngredientList.splice(index, 1);
    this.setState({ingredientList: newIngredientList});
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <TextField
          name="name"
          placeholder="Name"
          type="text"
          errorText={this.state.nameErrorText}
          value={this.state.name}
          onChange={e => this.onChange(e, 'name')}
        />
        <br />
        <TextField
          name="streetAddress"
          placeholder="Street Address (123 Pine)"
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
          placeholder="State (TX)"
          type="text"
          value={this.state.state}
          onChange={e => this.onChange(e, 'state')}
        />
        <br />
        <TextField
          name="zip"
          placeholder="Zip Code (12345)"
          type="text"
          errorText={this.state.zipErrorText}
          value={this.state.zip}
          onChange={e => this.onChange(e, 'zip')}
        />
        <br />
        <TextField
          name="phoneNumber"
          placeholder="Phone Number (0123456789)"
          type="text"
          errorText={this.state.phoneNumberErrorText}
          value={this.state.phoneNumber}
          onChange={e => this.onChange(e, 'phoneNumber')}
        />
        <br />
        <TextField
          name="hours"
          placeholder="Hours (7a-11a)"
          type="text"
          value={this.state.hours}
          onChange={e => this.onChange(e, 'hours')}
        />
        <br />
        <TextField
          name="baseTacoPrice"
          placeholder="Base Taco Price"
          type="text"
          errorText={this.state.baseTacoPriceErrorText}
          value={this.state.baseTacoPrice}
          onChange={e => this.onChange(e, 'baseTacoPrice')}
        />
        <br />
        <h4 style={this.state.ingredientList.length ? null : {'display': 'none'}}>Ingredients</h4>
        {this.state.ingredientList.map((ingredient, index) =>
          <div>
            <TextField
              name={`ingredientName${index}`}
              placeholder="Ingredient Name"
              type="text"
              value={ingredient.name}
            />
            <TextField
              name={`ingredientPrice${index}`}
              placeholder="Ingredient Price"
              type="text"
              value={ingredient.price}
            />
            <IconButton onClick={this.removeIngredient.bind(this, index)}><Close/></IconButton>
            <br />
          </div>
        )}
        <RaisedButton label="Add Ingredient" primary onClick={this.addIngredient}/>
        <div style={{'padding-bottom': '5px'}}/>
        <RaisedButton label="Submit" type="submit" primary />
      </form>
    );
  }
}
