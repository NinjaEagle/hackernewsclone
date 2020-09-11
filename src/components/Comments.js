import React, { Component } from 'react'
import { TriangleFill } from 'react-bootstrap-icons'
import './css/Comment.css'

export default class Comments extends Component {
	state = {
		text: [],
		user: 'Kevin',
		timeStamp: '',
	}
	clickBttn = () => {
		this.props.context.updatePosts('Hi')
		console.log(this.props.context.posts)
	}

	handlePost = (props) => {
		console.log(props)
		if (props.postID === this.props.postId) {
			console.log(props.postID)
		}
	}
	handleChange = (e) => {
		console.log(e.target)
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit = (e) => {
		e.preventDefault()

		this.props.newComment(this.props.postID)
	}

	render() {
		console.log(this.props.context.isSignedIn)
		console.log(this.state)
		return (
			<div className='comments'>
				{/* <button onClick={this.clickBttn}>Click me</button> */}
				<div className='boxes'>
					<form onSubmit={this.handleSubmit} className='commentForm'>
						<input
							onChange={this.handleChange}
							className='textbox'
							required
							type='text'
							name='text'
							placeholder='Say something...'
						/>
						<br />
						<input type='submit' value='add comment' />
					</form>
				</div>
				<div className='boxes'>
					<TriangleFill
						onClick={this.handleUpvote}
						size={16}
						style={{ cursor: 'pointer' }}
					/>
					<p>
						{this.state.user} {this.state.timestamp} ago [-]
					</p>
				</div>
			</div>
		)
	}
}
