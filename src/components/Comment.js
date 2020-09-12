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
import { Redirect } from 'react-router-dom'
import backend from '../api/backend'

class Comment extends Component {
	state = {
		user: '',
		timestamp: '',
		showConfirm: false,
		showDelete: false,
		deleteComment: false,
		deleteConfirm: false,
		description: '',
		showModal: false,
		redirect: false,
		voted: false,
	}

	editComment = async (e) => {
		e.preventDefault()
		let localID = this.props.postID
		let commentID = this.props.commentID
		let routeString = '/editComment/Posts/' + localID + '/comments/' + commentID
		console.log(routeString)
		const response = await backend.put(routeString, {
			body: JSON.stringify({
				post_id: localID,
				comment_id: this.props.commentID,
				commentBody: this.state.description,
			}),
		})

		console.log(response)
		this.setState({ showModal: false })
		this.setState({ showConfirm: true })
	}

	deleteComment = async (e) => {
		e.preventDefault()
		let localID = this.props.postID
		let commentID = this.props.commentID
		let routeString = '/deleteComment/Posts/' + localID + '/comments/' + commentID
		console.log(routeString)
		const response = await backend.delete(routeString, {
			body: JSON.stringify({
				post_id: localID,
				comment_id: this.props.commentID,
			}),
		})

		console.log(response)
		this.setState({ deleteConfirm: true })
	}

	updatePage = (event) => {
		this.setState({ showConfirm: false })
		this.forceUpdate()
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
		console.log(this.state)
		if (this.state.redirect) {
			return <Redirect push to='/' />
		}
		{
			!this.state.voted && (
				<TriangleFill
					style={{ backgroundColor: 'orange' }}
					onClick={this.handleUpvote}
					size={16}
					style={{ cursor: 'pointer' }}
				/>
			)
		}
		{
			this.state.voted && (
				<Button size='small' onClick={this.downvote}>
					unvote
				</Button>
			)
		}
		{
			this.props.index
		}

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
					</p>
					<p>
						{this.props.context.userName === this.props.user && (
							<Button
								onClick={() => {
									this.setState({ showModal: true })
								}}
								variant='primary'>
								Edit
							</Button>
						)}
						{this.props.context.userName === this.props.user && (
							<Button
								onClick={() => {
									this.setState({ showDelete: true })
								}}
								variant='primary'>
								Delete{' '}
							</Button>
						)}
					</p>
					<p>{this.props.text}</p>
				</div>
				{/* Edit comment modal */}
				<Modal
					backdrop='static'
					show={this.state.showModal}
					onHide={() => this.setState({ showModal: false })}>
					<Modal.Header closeButton>
						<Modal.Title>Edit your comment</Modal.Title>
					</Modal.Header>
					<form onSubmit={this.editComment}>
						<Modal.Body>
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text>Edit your comment description </InputGroup.Text>
								</InputGroup.Prepend>
								<FormControl
									as='textarea'
									aria-label='With textarea'
									value={this.state.description}
									onChange={(e) => this.setState({ description: e.target.value })}
								/>
							</InputGroup>
						</Modal.Body>
						<Modal.Footer>
							<Button variant='primary' type='submit'>
								Continue
							</Button>
						</Modal.Footer>
					</form>
				</Modal>

				<Modal
					show={this.state.showDelete}
					backdrop='static'
					onHide={() => this.setState({ showDelete: false })}>
					<Modal.Header closeButton>
						<Modal.Title>Your comment will be deleted...</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Are you really sure you want to delete this comment?
					</Modal.Body>
					<Modal.Footer>
						<Button variant='primary' onClick={this.deleteComment}>
							Yes
						</Button>
						<Button
							variant='danger'
							onClick={() => this.setState({ showDelete: false })}>
							No
						</Button>
					</Modal.Footer>
				</Modal>

				<Modal
					show={this.state.showConfirm}
					backdrop='static'
					onHide={() => this.setState({ showConfirm: false })}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Successful!</Modal.Title>
					</Modal.Header>
					<Modal.Body>Your comment was edited</Modal.Body>
					<Modal.Footer>
						<Button variant='primary' onClick={this.updatePage}>
							Continue
						</Button>
					</Modal.Footer>
				</Modal>

				<Modal
					show={this.state.deleteConfirm}
					backdrop='static'
					onHide={() => this.setState({ deleteConfirm: false })}>
					<Modal.Header closeButton>
						<Modal.Title>Delete Successful!</Modal.Title>
					</Modal.Header>
					<Modal.Body>Your comment was deleted</Modal.Body>
					<Modal.Footer>
						<Button
							variant='primary'
							onClick={() => {
								this.setState({ redirect: true })
							}}>
							Continue
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
}

export default Comment
