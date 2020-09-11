import React from 'react'

export default class ConfirmationModal extends React.Component {
    
    render() {
        return (
        <Modal.Dialog>
             <Modal.Header closeButton>
                 <Modal.Title>{this.props.title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <p>Modal body text goes here.</p>
                      </Modal.Body>
                 <Modal.Footer>
                     <Button variant="primary">Continue</Button>
                     </Modal.Footer>
                 </Modal.Dialog>
        );
    }
}