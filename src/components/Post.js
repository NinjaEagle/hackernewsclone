import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap'
import './css/Timeline.scss'
import { Link } from 'react-router-dom'
import { TriangleFill } from 'react-bootstrap-icons'

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
	state = {
		userPosted: false,
		showModal: false,
	}

	handleUpvote = (e) => {
		e.preventDefault()
		if (this.props.context.isSignedIn) {
			document.querySelector()
		}
	}

	userPost() {
		if (this.state.userPosted) {
			return (
				<Button
					variant='primary'
					style={{ background: '#449955' }}
					onClick={() => this.setState({ showModal: true })}>
					Edit
				</Button>
			)
		} else {
			return <React.Fragment></React.Fragment>
		}
	}

	render() {
		return (
			<React.Fragment>
				<Card className='posts'>
					<Card.Header>
						<TriangleFill
							onClick={this.handleUpvote}
							size={16}
							style={{ cursor: 'pointer' }}
						/>
						{this.props.index}.
					</Card.Header>
					<Card.Body className='postcards'>
						<Card.Title>
							<a href={this.props.link}>{this.props.title}</a>
						</Card.Title>
						<Card.Text>({this.props.link})</Card.Text>
					</Card.Body>
					<Card.Footer>
						{this.props.upvotes} points by {this.props.user} posted on{' '}
						{this.props.timeStamp} |{' '}
						<Link to={'/Comments/' + this.props.postID} post={this.props.postID}>
							{this.props.comments} comments{' '}
						</Link>
						{}
					</Card.Footer>
				</Card>
			</React.Fragment>
		)
	}
}
