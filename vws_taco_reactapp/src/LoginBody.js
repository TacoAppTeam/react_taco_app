import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';   
import axios from 'axios';
import { config } from './config.js';

export default class LoginBody extends Component {
    constructor(props) {
      super(props);
      this.state = {
        users: []
      }
    }

    submit = () => {
        window.currentUser = ReactDOM.findDOMNode(this.userSelect).value;
        this.props.submit();
    }

    componentDidMount () {
        const user_url = config.api_hostname + ':' + config.api_port + '/v1/users';
        axios.get(user_url).then(res => {
          for (let user of res.data) {
            this.state.users.push(user.email);
          }
    
          this.setState({'users': this.state.users});
        });
    }

    render = () => {
      let userSelects = [];
    
      for (let i = 0; i < this.state.users.length; i++) {
        let user = this.state.users[i];
        userSelects.push((<option value={user}>{user}</option>));
      }

      return (
        <form onSubmit={this.submit}>
            <FormGroup controlId="userSelect">
                <ControlLabel>User</ControlLabel>
                <FormControl componentClass="select" placeholder="select" ref={select => { this.userSelect = select }}>
                {userSelects}
                </FormControl>
            </FormGroup>

            <Button bsStyle="primary" onClick={this.submit}>Submit</Button>
        </form>
      )
    }
  }
