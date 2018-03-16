import React, {Component} from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Actions} from '../store';

class LoginBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
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
        <RaisedButton label="Submit" type="submit" />
      </form>
    );
  };
}

export default connect()(LoginBody);
