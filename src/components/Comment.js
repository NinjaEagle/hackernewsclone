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

class Comment extends Component {
	state = {
		user: '',
		timestamp: '',
		deleteComment: true,
	}

	deleteComment = () => {
		console.log('try to delete')
		this.setState({ deleteComment: true })
	}
	editComment = () => {
		if (
			true
			// this.props.context.isSignedIn &&
			// this.props.user == this.props.context.userName
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
						{this.props.user} {this.props.timestamp} ago [-]
						{this.editComment()}
					</p>
					<p>{this.props.text}</p>
				</div>
			</div>
		)
	}
}

export default Comment
