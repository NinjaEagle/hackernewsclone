import React from 'react'
import { Redirect } from 'react-router'
import {
	Button,
	Card,
	FormGroup,
	FormControl,
	FormLabel,
} from 'react-bootstrap'
import './css/Login.css'
import backend from '../api/backend'

export default class LogIn extends React.Component {
	state = {
		userName: '',
		password: '',
		response: '',
		redirect: false,
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
		console.log(response)
	}

	render() {
		if (this.state.redirect) {
			return <Redirect push to='/Profile' />
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
						<Button size='small' type='submit' variant='danger'>
							Sign Up
						</Button>
					</Card.Body>
				</Card>
			</div>
		)
	}
}
