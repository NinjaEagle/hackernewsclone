import React, { Component } from 'react'
import { Card, Button, InputGroup, FormControl, Modal } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import backend from '../api/backend'

export default class EditComment extends Component {
	state = {
		description: '',
		show: false,
		submitComplete: false,
		showModal: false,
	}

	// can't seem to pass down comment ID to update
	editComment = async (e) => {
		e.preventDefault()
		const response = await backend.put('/editComment/', {
			body: JSON.stringify({
				post_id: this.props.match.params.id,
				comment_id: 0,
			}),
		})
		console.log(response)
	}

	render() {
		console.log(this.props)
		// if (this.state.submitComplete) {
		// 	return <Redirect push to='/Comments/:id' />
		// }
		return (
			<div className='CreatePost'>
				<Card style={{ width: '30rem', height: '34rem' }} bg='dark' text='light'>
					<Card.Body>
						<Card.Title>Edit a Post {this.props.context.userName}</Card.Title>
						<form onSubmit={this.editComment}>
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text>Enter new comment </InputGroup.Text>
								</InputGroup.Prepend>
								<FormControl
									as='textarea'
									aria-label='With textarea'
									// value={this.state.description}
									onChange={(e) => this.setState({ description: e.target.value })}
								/>
							</InputGroup>
							<div style={{ paddingTop: '15px' }}>
								<Card.Footer>
									<Button block size='large' type='submit' variant='danger'>
										Edit Comment
									</Button>
								</Card.Footer>
							</div>
						</form>
					</Card.Body>
				</Card>

				<Modal
					show={this.state.showModal}
					onHide={() => this.setState({ showModal: false })}>
					<Modal.Header closeButton>
						<Modal.Title>Edited Comment Sucessfully</Modal.Title>
					</Modal.Header>
					<Modal.Body> Your comment is now updated</Modal.Body>
					<Modal.Footer>
						<Button
							variant='primary'
							onClick={() => {
								this.setState({ submitComplete: true })
							}}>
							Continue
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
}
