import React from 'react'
import {
	Card,
	Button,
	InputGroup,
	FormControl,
	FormGroup,
	FormLabel,
	Modal,
} from 'react-bootstrap'
import './css/CreatePost.css'
import { Redirect } from 'react-router-dom'
import backend from '../api/backend'

export default class CreatePost extends React.Component {
	state = {
		title: '',
		url: '',
		description: '',
		show: false,
		submitComplete: false,
		showModal: false,

		errorMessage: "",
		dupeFound: false
	}

	createPost = async (event) => {
		event.preventDefault()

		const response = await backend.post('/createPost', {
			body: JSON.stringify({
				title: this.state.title,
				description: this.state.description,
				link: this.state.url,
				uid: this.props.context.user_id,
				username: this.props.context.userName,
			}),
		})
		console.log(response)
		console.log(response.data.message)
		if(response.data.message) {
			this.setState({errorMessage: response.data.message})
			this.setState({dupeFound: true})
		}
	
		this.setState({ showModal: true })
	}

	handleReset = e => {
		this.setState({ errorMessage: "" })
		this.setState({ dupeFound: false })
		this.setState({ showModal: false })
	}

	render() {
		//console.log(this.state.submitComplete);

		if (this.state.submitComplete) {
			return <Redirect push to='/' />
		}

		return (
			<div className='CreatePost'>
				<Card style={{ width: '30rem', height: '34rem' }} bg='dark' text='light'>
					<Card.Body>
						<Card.Title>Submit a Post {this.props.context.userName}</Card.Title>
						<form onSubmit={this.createPost}>
							<FormGroup controlId='title'>
								<FormLabel style={{ color: 'white' }}>Title</FormLabel>
								<FormControl
									autoFocus
									type='title'
									value={this.state.title}
									onChange={(e) => this.setState({ title: e.target.value })}
									placeholder='Enter a title'
								/>
							</FormGroup>
							<FormGroup controlId='url'>
								<FormLabel style={{ color: 'white' }}>URL</FormLabel>
								<FormControl
									type='url'
									value={this.state.url}
									onChange={(e) => this.setState({ url: e.target.value })}
									placeholder='Enter the url'
								/>
							</FormGroup>
							&nbsp;
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text>Enter a description </InputGroup.Text>
								</InputGroup.Prepend>
								<FormControl
									as='textarea'
									aria-label='With textarea'
									value={this.state.description}
									onChange={(e) => this.setState({ description: e.target.value })}
								/>
							</InputGroup>
							<div style={{ paddingTop: '15px' }}>
								<Card.Footer>
									<Button block size='large' type='submit' variant='danger'>
										Create Post
									</Button>
								</Card.Footer>
							</div>
						</form>
					</Card.Body>
				</Card>

				<Modal
					show={this.state.showModal} backdrop="static"
					onHide={() => this.setState({ showModal: false })}>
					<Modal.Header closeButton>
						
						{!this.state.dupeFound && <Modal.Title>Post Created Sucessfully</Modal.Title>}
						{this.state.dupeFound && <Modal.Title>Error duplicate title detected</Modal.Title>}
					</Modal.Header>
					{!this.state.dupeFound &&
					<Modal.Body>
						{this.state.title} is now available on the front page
					</Modal.Body>
					}
					{this.state.dupeFound &&
					<Modal.Body>
						{this.state.title} already exists please try again
					</Modal.Body>
					}
					
					<Modal.Footer>
					{!this.state.dupeFound &&
						<Button
							variant='primary'
							onClick={() => {
								this.setState({ submitComplete: true })
							}}>
							Continue
						</Button>}
					{this.state.dupeFound &&
						<Button
						variant='primary'
						onClick={() => {
							this.setState({ submitComplete: true })
						}}>
							Retry		
						</Button>		
					}
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
}
