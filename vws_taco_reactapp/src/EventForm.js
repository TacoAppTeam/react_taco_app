import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
//import { DatePicker } from 'react-bootstrap-date-picker';


function FieldGroup({ id, label, help, inputRef, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} inputRef={inputRef}/>
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultDate: ''
    };
  };

  submit = () => {
    var formData = {};
    formData.user = this.inputUser.value;
    formData.location = this.inputLocation.value;
    this.props.submit(formData);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <FieldGroup
            id="user"
            type="text"
            label="User"
            placeholder="Enter text"
            inputRef = {(input) => this.inputUser = input }
          />
          <FieldGroup
            id="location"
            type="text"
            label="Location"
            placeholder="Enter text"
            inputRef = {(input) => this.inputLocation = input}
          />

          <Button bsStyle="primary" onClick={this.submit}>Submit</Button>
        </form>
      </div>
    )
  }
}

// TODO: Get datepicker working
// <FormGroup>
// <ControlLabel>Label</ControlLabel>
// <DatePicker id="example-datepicker" value={"2016-11-19T12:00:00.000Z"}/>
// <HelpBlock>Help</HelpBlock>
// </FormGroup>;