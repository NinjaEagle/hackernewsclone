import React, { Component } from 'react'
import {
	Button,
	Card,
	Modal,
	FormGroup,
	FormLabel,
	FormControl,
	InputGroup,
} from 'react-bootstrap'
import './css/Timeline.scss'
import { Link, Redirect } from 'react-router-dom'
import { TriangleFill } from 'react-bootstrap-icons'
import backend from '../api/backend'

/*
        // -- PROPS THAT SHOULD BE PASSED TO POST	--//
		postID: INT
		title: STRING
		link: STRING(make sure it's a link)
		upvotes: INT
		user: STRING
		timeStamp: STRING make sure
		comments: SHOULD BE ARRAY but for now INT
		index : INT // index in the timeline
*/

export default class Post extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userPosted: false,
			showModal: false,
			showConfirm: false,
			showDelete: false,
			deleteConfirm: false,
			edit: false,
			cPost: {},

			title: '',
			url: '',
			description: 'a',

			initTitle: '',
			initUrl: '',

			redirect: false,

			numComments: 0,
			currentUpvotes: 0,
			voted: false,
		}

		this._isMounted = false
	}

	async componentDidMount() {
		let localID = this.props.postID
		let routeString = '/getCommentList/post/' + localID
		const response = await backend.get(routeString, {})

		this._isMounted = true
		this.setState({ numComments: response.data.comments.length })
		this.setState({ title: this.props.title })
		this.setState({ url: this.props.link })
		this.setState({ description: this.props.description })
		this.setState({ currentUpvotes: this.props.upvotes })
	}

	componentWillUnmount() {
		this._isMounted = false
	}

	handleUpvote = async (e) => {
		e.preventDefault()
		if (this.props.context.isSignedIn) {
			console.log('Clicked upvote for:')
			console.log(this.props.postID)

			let localID = this.props.postID
			let routeString = '/upvotePost/' + localID + '/0'
			const response = await backend.put(routeString, {
				body: JSON.stringify({
					post_id: localID,
				}),
			})
			console.log(response)
			this.setState({ voted: true })
			this.setState({ currentUpvotes: this.state.currentUpvotes + 1 })
		}
	}

	downvote = async (e) => {
		e.preventDefault()
		let localID = this.props.postID
		let routeString = '/upvotePost/' + localID + '/1'
		const response = await backend.put(routeString, {
			body: JSON.stringify({
				post_id: localID,
			}),
		})
		console.log('downvote success')
		console.log(response)
		this.setState({ voted: false })
		this.setState({ currentUpvotes: this.state.currentUpvotes - 1 })
	}

	savePost = (event) => {
		event.preventDefault()
	}

	deletePost = async (event) => {
		event.preventDefault()
		let localID = this.props.postID
		let routeString = '/deletePost/' + localID
		const response = await backend.delete(routeString, {
			body: JSON.stringify({
				post_id: localID,
			}),
		})
		console.log(response.data)
		this.setState({ deleteConfirm: true })
	}

	editPost = async (event) => {
		event.preventDefault()
		let localID = this.props.postID
		let routeString = '/editPost/' + localID
		const response = await backend.put(routeString, {
			body: JSON.stringify({
				title: this.state.title,
				description: this.state.description,
				link: this.state.url,
				uid: this.props.context.user_id,
				username: this.props.context.userName,
			}),
		})

		console.log(response.data.message)
		this.setState({ showModal: false })
		this.setState({ showConfirm: true })
	}

	updatePage = (event) => {
		this.setState({ showConfirm: false })
		this.forceUpdate()
	}

	render() {
		if (this.state.redirect) {
			return <Redirect push to='/' />
		}

		return (
			<React.Fragment>
				<Card className='posts'>
					<Card.Header>
						{!this.state.voted && this.props.context.userName && (
							<TriangleFill
								style={{ backgroundColor: 'orange' }}
								onClick={this.handleUpvote}
								size={16}
								style={{ cursor: 'pointer' }}
							/>
						)}
						{this.state.voted && (
							<Button size='small' onClick={this.downvote}>
								unvote
							</Button>
						)}
						{this.props.index}.
					</Card.Header>
					<Card.Body className='postcards'>
						<Card.Title>
							<a href={this.state.url}>{this.state.title}</a>
						</Card.Title>
						<Card.Text>({this.props.link})</Card.Text>
					</Card.Body>
					<Card.Footer>
						{this.state.currentUpvotes} points by {this.props.user} posted on{' '}
						{this.props.timeStamp} PST |{' '}
						<Link to={'/Comments/' + this.props.postID} post={this.props.postID}>
							{this.state.numComments} comments{' '}
						</Link>
						{this.props.context.userName === this.props.user && (
							<Button
								onClick={() => {
									this.setState({ showModal: true })
								}}
								variant='primary'>
								Edit
							</Button>
						)}
						&nbsp;
						{this.props.context.userName === this.props.user && (
							<Button
								onClick={() => {
									this.setState({ showDelete: true })
								}}
								variant='primary'>
								Delete{' '}
							</Button>
						)}
					</Card.Footer>
				</Card>

				<Modal
					backdrop='static'
					show={this.state.showModal}
					onHide={() => this.setState({ showModal: false })}>
					<Modal.Header closeButton>
						<Modal.Title>You are editing: {this.props.title}</Modal.Title>
					</Modal.Header>
					<form onSubmit={this.editPost}>
						<Modal.Body>
							<FormGroup controlId='title'>
								<FormLabel style={{ color: 'white' }}>Title</FormLabel>
								<FormControl
									autoFocus
									type='title'
									value={this.state.title}
									onChange={(e) => this.setState({ title: e.target.value })}
									placeholder='Enter a title'
								/>
							</FormGroup>
							<FormGroup controlId='url'>
								<FormLabel style={{ color: 'white' }}>URL</FormLabel>
								<FormControl
									type='url'
									value={this.state.url}
									onChange={(e) => this.setState({ url: e.target.value })}
									placeholder='Enter the url'
								/>
							</FormGroup>
							&nbsp;
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text>Enter a description </InputGroup.Text>
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
						<Modal.Title>Delete Successful!</Modal.Title>
					</Modal.Header>
					<Modal.Body>Do you want to delete '{this.state.title}'?</Modal.Body>
					<Modal.Footer>
						<Button variant='primary' onClick={this.deletePost}>
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
					<Modal.Body>
						Your post '{this.state.title}' was successfully edited
					</Modal.Body>
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
					<Modal.Body>
						Your post '{this.state.title}' was successfully delted
					</Modal.Body>
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
			</React.Fragment>
		)
	}
}
