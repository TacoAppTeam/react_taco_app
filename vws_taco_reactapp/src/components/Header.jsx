import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';

import {Actions} from '../store';
import Title from './Title';
import LoginBody from './LoginBody';
import TacoModal from './TacoModal';

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser
  };
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      showLoginModal: false
    };
  }

  componentDidMount() {
    this.props.dispatch(Actions.user.checkUserLoggedIn());
  }

  closeModal = () => {
    this.setState({showLoginModal: false});
  };

  login = () => {
    this.setState({
      showLoginModal: true
    });
  };

  logout = () => {
    this.props.dispatch({
      type: Actions.user.LOGOUT_CURRENT_USER
    });
  };

  render() {
    return (
      <div className="container">
        <Title title="Taco App" />
        <Toolbar className="App">
          {this.props.currentUser ? (
            <ToolbarGroup>
              <FlatButton onClick={this.logout} primary={true} label="Log out" />

              <FlatButton label="Home" containerElement={<Link to="/" />} />
            </ToolbarGroup>
          ) : (
            <ToolbarGroup>
              <FlatButton label="Login" onClick={this.login} />
            </ToolbarGroup>
          )}
        </Toolbar>
        <TacoModal
          title="Choose a User"
          showModal={this.state.showLoginModal}
          close={this.closeModal}
        >
          <LoginBody onSubmit={this.closeModal} />
        </TacoModal>
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Header));
