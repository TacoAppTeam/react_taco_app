import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import axios from 'axios';
import { config } from '../config.js';
import * as userActions from '../store/user/actions';

function mapStateToProps(state) {
    return {
        currentUser: state.user.currentUser
    }
}

class LoginBody extends Component {
    constructor(props) {
      super(props);
      this.state = {
        users: []
      }
    }

    onSubmit = () => {
        this.props.dispatch({
            type: userActions.SET_CURRENT_USER,
            user: ReactDOM.findDOMNode(this.userSelect).value
        });
        this.props.onSubmit();
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
        <form onSubmit={this.onSubmit}>
            <FormGroup controlId="userSelect">
                <ControlLabel>User</ControlLabel>
                <FormControl componentClass="select" placeholder="select" ref={select => { this.userSelect = select }}>
                {userSelects}
                </FormControl>
            </FormGroup>

            <Button bsStyle="primary" onClick={this.onSubmit}>Submit</Button>
        </form>
      )
    }
  }

export default connect(mapStateToProps)(LoginBody)
