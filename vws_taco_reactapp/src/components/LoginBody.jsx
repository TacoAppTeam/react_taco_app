import React, {Component} from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Actions} from '../store';
import {Redirect} from 'react-router';

const initialState = {
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  createNewAcct: false
};

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser
  };
}

class LoginBody extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.props.dispatch(Actions.user.checkUserLoggedIn());
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
    this.props.dispatch(Actions.user.signIn(this.state.username, this.state.password));
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  };

  render = () => {
    if (this.props.currentUser) {
      return <Redirect push to={'/'} />;
    }
    return (
      <div>
        <input
          type="password"
          name="fake-password"
          autoComplete="new-password"
          tabIndex="-1"
          style={{opacity: 0, float: 'left', border: 'none', height: '0', width: '0'}}
        />
        {!this.state.createNewAcct ? (
          <form name="login" onSubmit={this.onSubmit} ref={form => (this.form = form)}>
            <TextField
              name="username"
              placeholder="Username"
              type="text"
              value={this.state.username}
              autoComplete="nope"
              onChange={e => this.onChange(e, 'username')}
            />
            <br />
            <TextField
              name="password"
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={e => this.onChange(e, 'password')}
              autoComplete="new-password"
            />
            <br />
            <RaisedButton label="Submit" type="submit" />
            <div />
            <RaisedButton
              label="Create New User"
              onClick={() => {
                this.setState({...initialState, createNewAcct: true});
              }}
            />
          </form>
        ) : (
          <form name="createUser" onSubmit={this.onCreateUser} ref={form => (this.form = form)}>
            <TextField
              name="username"
              floatingLabelText="Username"
              type="text"
              autoComplete="nope"
              value={this.state.username}
              onChange={e => this.onChange(e, 'username')}
            />
            <br />
            <TextField
              name="firstname"
              floatingLabelText="First Name"
              type="text"
              autoComplete="nope"
              value={this.state.firstName}
              onChange={e => this.onChange(e, 'firstName')}
            />
            <br />
            <TextField
              name="lastname"
              floatingLabelText="Last Name"
              type="text"
              autoComplete="nope"
              value={this.state.lastName}
              onChange={e => this.onChange(e, 'lastName')}
            />
            <br />
            <TextField
              name="password"
              floatingLabelText="Password"
              type="password"
              value={this.state.password}
              autoComplete="new-password"
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

export default connect(mapStateToProps)(LoginBody);
