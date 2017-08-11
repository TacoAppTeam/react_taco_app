import React, { PropTypes } from 'react';
import Title from './Title';
import './App.css';


let loggedIn = false;

const Header = ({ children }) => (
  <div>
    <div className="App App-header">
      <Title title="Taco App"></Title>
      <h2>username</h2>

      {
        loggedIn ? (<button onClick={() => { loggedIn=true }}>Logout</button>)
        : (<button onClick={() => { loggedIn=false }}>Login</button>)
      }
    </div>

    {children}

  </div>
);

Header.propTypes = {
  children: PropTypes.object.isRequired
};

export default Header;
