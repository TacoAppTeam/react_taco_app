import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Title extends Component {
  render() {
    return (
      <div className="title">
        <h1>
          <Link to="home">{this.props.title}</Link>
        </h1>
      </div>
    );
  }
}
