import React from 'react'
import './css/Timeline.scss'
import Post from './Post'
import { Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import backend from '../api/backend'

export default class Timeline extends React.Component {
	state = {
		index: 0,
		text: '',
		isSignedIn: false,
		dummyProj: this.props.context.posts,
		createPost: false,
	}
	handleUpvote = (e) => {
		e.preventDefault()
	}
	handleLink = (link) => {
		console.log(link)
	}

	async componentDidMount() {
		const response = await backend.get('/getPostList', {})
		console.log(response.data.posts)
		this.setState({ dummyProj: response.data.posts })
	}
	componentWillUnmount() {
		// this.props.context.updateText(this.state.text)
		// this.props.context.updateIsSignedIn(this.state.isSignedIn);
		//console.log("Unmoounted");
		//this.props.context.initPosts(this.state.dummyProj);
		this.props.context.initPosts(this.state.dummyProj)
	}

	convertTimeStamp() {}

	renderPosts() {
		//console.log(this.props.context.posts);
		const { context } = this.props

		if (this.state.createPost) {
			return <Redirect push to='/CreatePost' />
		}

		return (
			<div className='timeline'>
				<div style={{ marginTop: '20px' }}>
					Welcome {this.props.context.userName}!
					<br />
					<Button
						variant='primary'
						style={{ background: '#449955' }}
						onClick={() => this.setState({ createPost: true })}>
						Submit a Post
					</Button>
				</div>
				{this.state.dummyProj.map((p) => (
					<div key={p.post_id}>
						<Post
							postID={p.postID}
							title={p.title}
							link={p.link}
							upvotes={p.upvotes}
							user={p.username}
							timeStamp={p.timeStamp}
							comments={p.comments}
							index={this.state.dummyProj.indexOf(p) + 1}
							context={context}
						/>
					</div>
				))}

				<div className='downArrow bounce'>
					<img
						width='40'
						height='40'
						alt=''
						src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGlkPSLQodC70L7QuV8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0yNC4yODUsMTEuMjg0TDE2LDE5LjU3MWwtOC4yODUtOC4yODhjLTAuMzk1LTAuMzk1LTEuMDM0LTAuMzk1LTEuNDI5LDAgIGMtMC4zOTQsMC4zOTUtMC4zOTQsMS4wMzUsMCwxLjQzbDguOTk5LDkuMDAybDAsMGwwLDBjMC4zOTQsMC4zOTUsMS4wMzQsMC4zOTUsMS40MjgsMGw4Ljk5OS05LjAwMiAgYzAuMzk0LTAuMzk1LDAuMzk0LTEuMDM2LDAtMS40MzFDMjUuMzE5LDEwLjg4OSwyNC42NzksMTAuODg5LDI0LjI4NSwxMS4yODR6IiBmaWxsPSIjMTIxMzEzIiBpZD0iRXhwYW5kX01vcmUiLz48Zy8+PGcvPjxnLz48Zy8+PGcvPjxnLz48L3N2Zz4='
					/>
				</div>
			</div>
		)
	}

	render() {
		return <div>{this.renderPosts()}</div>
	}
}
