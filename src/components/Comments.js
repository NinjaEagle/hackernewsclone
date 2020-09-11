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

	render() {
		return (
			<div>
				<button onClick={this.clickBttn}>Click me</button>
				<form className='commentForm'>
					<input type='text' placeholder='Say something...' />
					<input type='submit' value='add comment' />
				</form>
				<TriangleFill
					onClick={this.handleUpvote}
					size={16}
					style={{ cursor: 'pointer' }}
				/>
				<p>Hi {this.state.user}</p>
				{this.props.match.params.id}
			</div>
		)
	}
}
