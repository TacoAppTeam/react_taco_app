import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
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

  closeModal = () => {
    this.setState({showLoginModal: false});
  };

  login = () => {
    this.setState({
      showLoginModal: true
    });
  };

  logout = () => {
    console.log('logout');
    this.setState({
      loggedIn: false
    });
  };

  render() {
    return (
      <div className="container">
        <Title title="Taco App" />
        <div className="App navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li>
                <a>
                  {this.props.currentUser
                    ? `Hello, ${this.props.currentUser.first_name}`
                    : 'Please Log In'}
                </a>
              </li>
              <li>
                <Link to={'/'}>Events</Link>
              </li>
            </ul>
          </div>
        </div>

        {this.state.loggedIn ? (
          <button onClick={this.logout}>Logout</button>
        ) : (
          <button onClick={this.login}>Login</button>
        )}

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
