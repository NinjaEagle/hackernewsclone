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
		return <div></div>
	}
}
