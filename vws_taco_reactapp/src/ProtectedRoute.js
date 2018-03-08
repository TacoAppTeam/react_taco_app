import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Actions} from './store';

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser
  };
}

class ProtectedRoute extends React.Component {
  componentDidMount = () => {
    this.props.dispatch(Actions.user.checkUserLoggedIn());
  };

  render() {
    return this.props.currentUser ? (
      <Route component={this.props.component} />
    ) : (
      <Redirect to="/login" />
    );
  }
}

export default connect(mapStateToProps)(ProtectedRoute);
