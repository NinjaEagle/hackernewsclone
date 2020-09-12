import React, { Component } from 'react'
import './css/Comment.css'
import backend from '../api/backend'
import Comment from './Comment.js'
import { Modal, Button } from 'react-bootstrap'
import {Redirect} from 'react-router-dom'

export default class Comments extends Component {
	state = {
		localPosts: [],
		text: '',
		userName: '',
		comment_id: '',
		timeStamp: '',
		localComments: [],
		submitComplete: false,
	}

	async componentDidMount() {
		const response = await backend.get('/getPostList', {})
		const commResponse = await backend.get(
			`/getCommentList/post/${this.props.match.params.id}`,
			{}
		)
		console.log(commResponse)

		// console.log(response)
		this.setState({
			localComments: commResponse.data.comments,
			localPosts: response.data.posts,
			userName: this.props.context.userName,
			post_id: this.props.match.params.id,
		})
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

	handleChange = (e) => {
		console.log(e.target)
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		const response = await backend.post('/addCommentToPost', {
			body: JSON.stringify({
				post_id: this.state.post_id,
				commentBody: this.state.text,
				username: this.props.context.userName,
			}),
		})

		console.log(response)
		this.setState({ showModal: true })
	}

	render() {
		console.log(this.state)
		let post = this.state.localPosts.filter((post) => {
			return post.post_id == this.props.match.params.id
		})
		const { context } = this.props

		if (this.state.submitComplete) {
			return <Redirect push to='/' />
		}

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
				{this.state.localComments.map((c) => (
					<div key={c.comment_id}>
						<Comment
							commentID={c.comment_id}
							text={c.commentBody}
							postID={this.state.post_id}
							user={c.username}
							timeStamp={c.createdAt}
							index={this.state.localPosts.indexOf(c) + 1}
							context={context}
						/>
					</div>
				))}

				<Modal backdrop="static"
					show={this.state.showModal}
					onHide={() => this.setState({ showModal: false })}>
					<Modal.Header closeButton>
						<Modal.Title>Comment Created Sucessfully</Modal.Title>
					</Modal.Header>
					<Modal.Body> Your comment is now available on this page</Modal.Body>
					<Modal.Footer>
						<Button
							variant='primary'
							 onClick={() => {
								this.setState({submitComplete: true})
							}}>
							Continue
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
}
