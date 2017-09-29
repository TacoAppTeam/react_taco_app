import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class TacoModal extends Component {
  constructor(props) {
    super(props);
  };

  close = () => {
    this.props.close();
  };

  render() {
    return(
      <div>
        <Modal show={this.props.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.body}
          </Modal.Body>
          <Modal.Footer>
            {this.props.showSubmit ? (
              <Button bsStyle="primary">Submit</Button>
            ) : (<div></div>)
            }
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}