import React, { Component } from 'react'
import { TriangleFill } from 'react-bootstrap-icons'
import './css/Comment.css'
import backend from '../api/backend'

export default class Comments extends Component {
	state = {
		localPosts: [],
		text: '',
		user: '',
		timeStamp: '',
	}
	clickBttn = () => {
		this.props.context.updatePosts('Hi')
		console.log(this.props.context.posts)
	}
	async componentDidMount() {
		const response = await backend.get('/getPostList', {})
		console.log(response)
		this.setState({ localPosts: response.data.posts })
	}

	postDetails = (post) => {
		if (post) {
			return (
				<div>
					<h1>{post.title}</h1>
					<p>
						{post.upvotes} upvotes by {post.username} {post.timeStamp} ago{' '}
						{post.comments}
					</p>
				</div>
			)
		}
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

		// this.props.newComment(this.props.postID)
	}

	render() {
		let post = this.state.localPosts.filter((post) => {
			return post.post_id === this.props.match.params.id
		})
		console.log(post)

		return (
			<div className='comments'>
				{/* <button onClick={this.clickBttn}>Click me</button> */}
				<div className='boxes'>
					{this.postDetails(post[0])}
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
