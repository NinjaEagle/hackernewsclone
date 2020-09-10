import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { TriangleFill } from 'react-bootstrap-icons'
import './css/Comment.css'
import { AppContext } from '../app/context.js'

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
		console.log(this.props.context.isSignedIn)
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
			</div>
		)
	}
}
