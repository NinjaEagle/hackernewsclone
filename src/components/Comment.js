import React, { Component } from 'react'
import { TriangleFill } from 'react-bootstrap-icons'
import {
	Button,
	Card,
	FormControl,
	FormGroup,
	FormLabel,
	Modal,
	InputGroup,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import backend from '../api/backend'

class Comment extends Component {
	state = {
		user: '',
		timestamp: '',
		deleteComment: true,
	}

	deleteComment = async (e) => {
		e.preventDefault()
		console.log('try to delete')
		const response = await backend.delete(`/deletePost/${this.props.postID}`, {
			body: JSON.stringify({
				username: this.props.context.userName,
			}),
		})

		console.log(response)
		this.setState({ deleteComment: true })
	}
	editComment = () => {
		if (
			this.props.context.isSignedIn &&
			this.props.user == this.props.context.userName
		) {
			return (
				<div>
					<Link to={'/EditComment/' + this.props.postID} postID={this.props.postID}>
						Edit COMMENT
					</Link>
					<Button onClick={this.deleteComment}>Delete</Button>
				</div>
			)
		} else {
			return <div></div>
		}
	}
	convertTimeStamp(stamp) {
		let temp = new Date(stamp)
		let date =
			temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate()
		let time = temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds()
		let timestamp = date + ' ' + time
		return timestamp
	}

	render() {
		console.log(this.props)

		return (
			<div>
				<div className='boxes'>
					<TriangleFill
						onClick={this.handleUpvote}
						size={16}
						style={{ cursor: 'pointer' }}
					/>
					<p>
						{this.props.user} commented at{' '}
						{this.convertTimeStamp(this.props.timeStamp)} [-]
						{this.editComment()}
					</p>
					<p>{this.props.text}</p>
				</div>
			</div>
		)
	}
}

export default Comment
