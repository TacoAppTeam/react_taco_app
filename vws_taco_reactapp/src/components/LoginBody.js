import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import {Actions} from '../store';
import Loader from 'react-loader';

class LoginBody extends Component {
  onSubmit = () => {
    this.props.dispatch(
      Actions.user.signIn({
        username: this.state.username,
        password: this.state.password
      })
    );
    this.props.onSubmit();
  };

  render = () => {
    return (
      <form onSubmit={this.onSubmit} ref={form => (this.form = form)}>
        <input name="username" placeholder="Username" type="text" value={this.state.username} />
        <br />
        <input name="password" placeholder="Password" type="password" value={this.state.password} />
        <br />
        <button label="Submit" primary onClick={this.onSubmit.bind(this)} />
      </form>
    );
  };
}

export default connect()(LoginBody);
