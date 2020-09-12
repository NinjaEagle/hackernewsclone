import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {Modal, Button} from 'react-bootstrap'
import './css/navbar.css'

class Navbar extends Component {
	render() {

		if (this.props.context.isSignedIn==="true") {
			return (
				<div className='navBar-comp'>
					<div className='tabBox-main'>
						<Link className='Logo' to='/'>
							<h1 className='TabLogo' label='Logo'>
								Hackernews
							</h1>
						</Link>
					</div>
					<div className='tabContainerBox'>
						<div className='tabBox-nav'>
							<div className='tabBox'>
								<Link to='/Profile' state={'Profile'}>
									<h3 className='TabLabel' label='Profile'>
										Profile
									</h3>
								</Link>
							</div>
							<div className='tabBox'>
							<Link to='/Signout' state={'Signout'}>
									<h3 className='TabLabel' label='Profile'>
										Sign out
									</h3>
							</Link>
							</div>
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div className='navBar-comp'>
					<div className='tabBox-main'>
						<Link className='Logo' to='/'>
							<h1 className='TabLogo' label='Logo'>
								Hackernews
							</h1>
						</Link>
					</div>
					<div className='tabContainerBox'>
						<div className='tabBox-nav'>
							<div className='tabBox'>
								<Link to='/Login' state={'Login'}>
									<h3 className='TabLabel' label='Login'>
										Login
									</h3>
								</Link>
							</div>
							<div className='tabBox'>
								<Link to='/Signup' state={'Signup'}>
									<h3 className='TabLabel' label='Timeline'>
										Sign Up
									</h3>
								</Link>
							</div>
						</div>
					</div>
				</div>
			)
		}
	}
}
export default Navbar
