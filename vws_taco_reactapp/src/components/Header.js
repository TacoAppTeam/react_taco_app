import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Actions} from '../store';
import Title from './Title';
import LoginBody from './LoginBody';
import './App.css';
import TacoModal from './TacoModal.js';

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
        <div className="App navbar navbar-default">
          <div className="container-fluid">
            {this.props.currentUser ? (
              <ul className="nav navbar-nav">
                <li>
                  <label>{`Hello, ${this.props.currentUser.first_name}`}</label>
                  <button onClick={this.logout}>Logout</button>
                </li>
              </ul>
            ) : (
              <ul className="nav navbar-nav">
                <li>
                  {' '}
                  <button onClick={this.login}>Login</button>
                </li>
              </ul>
            )}
          </div>
        </div>
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

export default connect(mapStateToProps)(Header);
