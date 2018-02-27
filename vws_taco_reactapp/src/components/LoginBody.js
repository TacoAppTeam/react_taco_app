import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import {Actions} from '../store';
import Loader from 'react-loader';

class LoginBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onSubmit = evt => {
    evt.preventDefault();
    this.props.dispatch(Actions.user.signIn(this.state.username, this.state.password));
    this.props.onSubmit();
  };

  onChange = (evt, which) => {
    var val = evt.currentTarget.value;
    let newState = {};
    newState[which] = val;
    this.setState(newState);
  };

  render = () => {
    return (
      <form onSubmit={this.onSubmit} ref={form => (this.form = form)}>
        <input
          name="username"
          placeholder="Username"
          type="text"
          value={this.state.username}
          onChange={e => this.onChange(e, 'username')}
        />
        <br />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={this.state.password}
          onChange={e => this.onChange(e, 'password')}
        />
        <br />
        <button label="Submit" primary />
      </form>
    );
  };
}

export default connect()(LoginBody);
