import React, { Component } from 'react'
import { TriangleFill } from 'react-bootstrap-icons'
import './css/Comment.css'

export default class Comments extends Component {
	state = {
		text: 'Hi',
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
	handleSubmit = (e) => {
		e.preventDefault()
		console.log(e.target.value)
	}

	render() {
		console.log(this.props.context.isSignedIn)
		return (
			<div className='comments'>
				{/* <button onClick={this.clickBttn}>Click me</button> */}
				<div className='boxes'>
					<form onSubmit={this.handleSubmit} className='commentForm'>
						<input className='textbox' type='text' placeholder='Say something...' />
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
				<p>{this.state.text}</p>
			</div>
		)
	}
}
