import React from 'react'
import { Redirect } from 'react-router'
import {
	Button,
	Card,
	FormGroup,
	FormControl,
	FormLabel,
	Modal,
	Nav,
} from 'react-bootstrap'
import './css/Login.css'
import backend from '../api/backend'

export default class LogIn extends React.Component {
	constructor(props) {
		super(props)

		this._isMounted = false
		this.state = {
			userName: '',
			password: '',
			response: '',
			redirect: false,
			showModal: false,
		}
	}

	componentDidMount() {
		this._isMounted = true
	}

	// to do link buttons to pages
	// link up api calls
	validateLogin = async (event) => {
		event.preventDefault()
		const response = await backend.post('/validateUser', {
			body: JSON.stringify({
				username: this.state.userName.toLowerCase(),
				password: this.state.password,
			}),
		})

		if (this._isMounted) {
			this.props.context.updateUser_id(response.data.user_id)
			this.props.context.updateUsername(this.state.userName)
			this.props.context.updateIsSignedIn("true")
			this.setState({ showModal: true })
		}
	}

	handleRedirect = (event) => {
		this.setState({})
	}

	componentWillUnmount() {
		this._isMounted = false
	}

	render() {
		if (this.state.redirect) {
			return <Redirect push to='/' />
		}

		return (
			<div className='LogIn'>
				<Card style={{ width: '30rem', height: '32rem' }} bg='dark' text='light'>
					<Card.Body>
						<Card.Title>Log in</Card.Title>
						<form onSubmit={this.validateLogin}>
							<FormGroup controlId='userName'>
								<FormLabel style={{ color: 'white' }}>Username</FormLabel>
								<FormControl
									autoFocus
									type='userName'
									value={this.state.userName}
									onChange={(e) => this.setState({ userName: e.target.value })}
									placeholder='Enter your username'
								/>
							</FormGroup>
							<FormGroup controlId='password'>
								<FormLabel style={{ color: 'white' }}>Password</FormLabel>
								<FormControl
									value={this.state.password}
									onChange={(e) => this.setState({ password: e.target.value })}
									placeholder='Enter password'
									type='password'
								/>
							</FormGroup>
							<div style={{ paddingTop: '15px' }}>
								<Button block size='large' type='submit' variant='danger'>
									Log In
								</Button>
							</div>
						</form>
						<Card.Footer>
							<div className='text-muted'>Don't have an account?</div>
						</Card.Footer>
						<Button onClick={this.signUp} size='small' type='submit' variant='danger'>
							<Nav.Item>
								<Nav.Link href='/SignUp'>SignUp</Nav.Link>
							</Nav.Item>
							{/* Sign Up */}
						</Button>
					</Card.Body>
				</Card>

				<Modal
					show={this.state.showModal} backdrop="static"
					onHide={() => this.setState({ showModal: false })}>
					<Modal.Header closeButton>
						<Modal.Title>Logged In Sucessfully</Modal.Title>
					</Modal.Header>
					<Modal.Body>You are logged in as {this.props.context.userName}</Modal.Body>
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
			</div>
		)
	}
}
