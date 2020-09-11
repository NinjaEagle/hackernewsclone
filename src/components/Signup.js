import React from 'react'
import { Redirect } from 'react-router'
import {
	Button,
	Card,
	FormGroup,
	FormControl,
	FormLabel,
	Modal,
} from 'react-bootstrap'
import './css/SignUp.css'
import backend from '../api/backend'

export default class SignUp extends React.Component {
	state = {
		userName: '',
		password: '',
		confirmPassword: '',

		noMatch: false,
		redirect: false,
		showModal: false,
		userAlreadyExists: false,
	}

	//  link up api calls and input validation
	createAccount = async (event) => {
		event.preventDefault()
		if (this.state.password !== this.state.confirmPassword) {
			this.setState({ noMatch: true })
			return
		}

		const response = await backend.post('/createUser', {
			body: JSON.stringify({
				username: this.state.userName,
				password: this.state.password,
			}),
		})

		if (response.data.success === 'true') {
			this.setState({ showModal: true })
		} else {
			this.setState({})
			this.setState({ userAlreadyExists: true })
		}
	}

	render() {
		if (this.state.redirect) {
			return <Redirect push to='/Login' />
		}

		return (
			<div className='SignUp'>
				{this.state.noMatch === true && (
					<h5>Password and Confirm Password do not match!</h5>
				)}
				{this.state.userAlreadyExists === true && (
					<h5>This username already exists please try another one</h5>
				)}
				<Card style={{ width: '30rem', height: '34rem' }} bg='dark' text='light'>
					<Card.Body>
						<Card.Title>Sign Up</Card.Title>
						<form onSubmit={this.createAccount}>
							<FormGroup controlId='userName'>
								<FormLabel style={{ color: 'white' }}>Username</FormLabel>
								<FormControl
									autoFocus
									type='userName'
									value={this.state.userName}
									onChange={(e) => this.setState({ userName: e.target.value })}
									placeholder='Enter a username'
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
							<FormGroup controlId='confirmPassword'>
								<FormLabel style={{ color: 'white' }}>Confirm Password</FormLabel>
								<FormControl
									value={this.state.confirmPassword}
									onChange={(e) => this.setState({ confirmPassword: e.target.value })}
									placeholder='Confirm password'
									type='password'
								/>
							</FormGroup>

							<div style={{ paddingTop: '15px' }}>
								<Card.Footer>
									<Button block size='large' type='submit' variant='danger'>
										Create Account
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
						<Modal.Title>Account Creation Successful!</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						You will be redirected to the Login Page {this.state.userName}
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
			</div>
		)
	}
}
