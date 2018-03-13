import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

export default class TacoModal extends Component {
  close = () => {
    this.props.close();
  };

  render() {
    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.children}</Modal.Body>
          <Modal.Footer />
        </Modal>
      </div>
    );
  }
}
