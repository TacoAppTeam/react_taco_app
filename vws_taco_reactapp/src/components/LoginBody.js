import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Actions} from '../store';

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
      users: []
    };
  }

  onSubmit = () => {
    this.props.dispatch({
      type: Actions.user.SET_CURRENT_USER,
      user: ReactDOM.findDOMNode(this.userSelect).value
    });
    this.props.onSubmit();
  };

  componentDidMount() {
    this.props.dispatch(Actions.user.fetchUsers());
  }

  render = () => {
    let userSelects = [];

    for (let i = 0; i < this.prop.users.length; i++) {
      let user = this.prop.users[i];
      userSelects.push(<option value={user}>{user}</option>);
    }

    return (
      <form onSubmit={this.onSubmit}>
        <FormGroup controlId="userSelect">
          <ControlLabel>User</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="select"
            ref={select => {
              this.userSelect = select;
            }}
          >
            {userSelects}
          </FormControl>
        </FormGroup>

        <Button bsStyle="primary" onClick={this.onSubmit}>
          Submit
        </Button>
      </form>
    );
  };
}

export default connect(mapStateToProps)(LoginBody);
