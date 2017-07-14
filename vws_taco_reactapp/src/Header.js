import React, { Component } from 'react';
import Title from './Title';

export default class Header extends Component {
  render() {
    return (
    	<div>
	      <Title title={this.props.title}></Title>
	      <div class="header">username</div>
	      <div class="header">Logout</div>
     	</div>
    );
  }
}
