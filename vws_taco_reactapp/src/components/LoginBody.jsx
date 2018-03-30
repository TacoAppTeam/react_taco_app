import React, {Component} from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Actions} from '../store';

const initialState = {
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  createNewAcct: false
};

class LoginBody extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  onChange = (evt, which) => {
    var val = evt.currentTarget.value;
    let newState = {};
    newState[which] = val;
    this.setState(newState);
  };

  onSubmit = evt => {
    evt.preventDefault();
    this.props.dispatch(Actions.user.signIn(this.state.username, this.state.password));
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  };

  onCreateUser = evt => {
    evt.preventDefault();
    this.props.dispatch(
      Actions.user.createUser(
        this.state.username,
        this.state.firstName,
        this.state.lastName,
        this.state.password
      )
    );
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  };

  render = () => {
    return (
      <div>
        {!this.state.createNewAcct ? (
          <form onSubmit={this.onSubmit} ref={form => (this.form = form)}>
            <TextField
              name="username"
              placeholder="Username"
              type="text"
              value={this.state.username}
              onChange={e => this.onChange(e, 'username')}
            />
            <br />
            <TextField
              name="password"
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={e => this.onChange(e, 'password')}
            />
            <br />
            <RaisedButton label="Submit" type="submit" />
            <div />
            <RaisedButton
              label="Create New User"
              onClick={() => {
                this.setState({createNewAcct: true});
              }}
            />
          </form>
        ) : (
          <form onSubmit={this.onCreateUser} ref={form => (this.form = form)}>
            <TextField
              name="username"
              floatingLabelText="Username"
              type="text"
              value={this.state.username}
              onChange={e => this.onChange(e, 'username')}
            />
            <br />
            <TextField
              name="firstname"
              floatingLabelText="First Name"
              type="text"
              value={this.state.firstName}
              onChange={e => this.onChange(e, 'firstName')}
            />
            <br />
            <TextField
              name="lastname"
              floatingLabelText="Last Name"
              type="text"
              value={this.state.lastName}
              onChange={e => this.onChange(e, 'lastName')}
            />
            <br />
            <TextField
              name="password"
              floatingLabelText="Password"
              type="password"
              value={this.state.password}
              onChange={e => this.onChange(e, 'password')}
            />
            <br />
            <RaisedButton label="Submit" type="submit" />
          </form>
        )}
      </div>
    );
  };
}

export default connect()(LoginBody);
