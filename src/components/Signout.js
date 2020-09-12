import React from 'react'
import {Card, Button, Modal} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'

export default class Signout extends React.Component {

    state = {
        cancel: false,
        showModal: false,
        redirect: false,
    }

    handleSignOut = e => {
        e.preventDefault();
        this.props.context.updateIsSignedIn("false");
        this.props.context.updateUsername("");
        this.props.context.updateUser_id("");
        this.setState({showModal: true});
    }


    render() {
        if (this.state.cancel) {
			return <Redirect push to='/' />
        }
        
        if(this.state.redirect) {
            return <Redirect push to='/' />
        }

        return (
        <React.Fragment>
        <Card >
             <Card.Header>Are you sure you want to Sign out {this.props.context.userName}?</Card.Header>
             <Card.Body>
                  <Card.Text>
                      </Card.Text>
                      <Button onClick={this.handleSignOut} variant="primary">
                          Yes
                      </Button>

                      <Button onClick={()=>{this.setState({cancel: true})}}
                      variant="danger">
                          No
                      </Button>
                      </Card.Body>
            </Card>

            <Modal
				show={this.state.showModal} backdrop="static"
					onHide={() => this.setState({ showModal: false })}>
					<Modal.Header closeButton>
						<Modal.Title>Sign out successful!</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						You will be redirected to the Sign out Page {this.state.userName}
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant='primary'
							onClick={() => {
								this.setState({ redirect: true })
							}}>
							Continue
						</Button>
					</Modal.Footer>
				</Modal>

        </React.Fragment>
        );
    }
}