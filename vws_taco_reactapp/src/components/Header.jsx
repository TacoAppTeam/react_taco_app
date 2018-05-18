import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import {NotificationContainer} from 'material-ui-notifications';

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
      showLoginModal: false,
      redirect: false
    };
  }

  componentDidMount() {
    this.props.dispatch(Actions.user.checkUserLoggedIn());
  }

  componentWillReceiveProps(nextProps) {
    nextProps.currentUser && this.setState({showLoginModal: false});
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
            <Fragment>
              <ToolbarGroup>
                <FlatButton onClick={this.logout} primary={true} label="Log out" />
                <FlatButton label="Home" containerElement={<Link to="/" />} />
                <FlatButton label="Location Mgmt" containerElement={<Link to="/locationmgmt" />} />
              </ToolbarGroup>
              <ToolbarGroup lastChild={true}>
                <FlatButton
                  label={`Clicking this does nothing, ${this.props.currentUser.first_name}`}
                  onClick={() => {
                    this.setState({redirect: true});
                  }}
                />
              </ToolbarGroup>
            </Fragment>
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
          <LoginBody />
        </TacoModal>
        <NotificationContainer />
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Header));
