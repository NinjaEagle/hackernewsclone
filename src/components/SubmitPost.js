import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class SubmitPost extends Component {
	handleSubmit = () => {
		// if (!this.props.context.isSignedIn) {
		// 	return <Redirect push to='/Login' />
		// }
	}
	render() {
		console.log(this.props.context)
		return (
			<div>
				<button onClick={this.handleSubmit}>Submit a new Post </button>
			</div>
		)
	}
}
export default SubmitPost
