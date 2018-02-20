import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Actions} from '../store';
import Loader from 'react-loader';

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
    users: state.user.list
  };
}

class LoginBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: null
    };
  }
  onSubmit = () => {
    this.props.dispatch({
      type: Actions.user.SET_CURRENT_USER,
      user: this.state.selectedUser
    });
    this.props.onSubmit();
  };

  changeUser = (evt, idx, val) => {
    this.setState({selectedUser: val});
  };

  componentDidMount() {
    this.props.dispatch(Actions.user.fetchUsers());
  }

  render = () => {
    return (
      <Loader loaded={!this.props.usersPending}>
        <form onSubmit={this.onSubmit}>
          <SelectField
            floatingLabelText="User"
            value={this.state.selectedUser}
            onChange={this.changeUser}
          >
            <MenuItem value={null} primaryText="" />
            {this.props.users.map(user => (
              <MenuItem
                value={user}
                primaryText={user.first_name + ' ' + user.last_name}
              />
            ))}
          </SelectField>

          <div>
            <RaisedButton
              label="Submit"
              primary
              onClick={this.onSubmit.bind(this)}
            />
          </div>
        </form>
      </Loader>
    );
  };
}

export default connect(mapStateToProps)(LoginBody);
