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
		localPosts: [],
		createPost: false,
	}
	handleUpvote = (e) => {
		e.preventDefault()
	}

	async componentDidMount() {
		const response = await backend.get('/getPostList', {})

		let tempPosts = response.data.posts
		tempPosts.sort((a, b) => (this.convertTimeStamp(a.createdAt) < this.convertTimeStamp(b.createdAt)) ? 1 : -1);
		this.setState({ localPosts: tempPosts })
	}
	componentWillUnmount() {
		this.props.context.initPosts(this.state.localPosts)
	}

	convertTimeStamp(stamp) {
		let temp = new Date(stamp)
		let date =
			temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate()
		let time = temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds()
		let timestamp = date + ' ' + time
		return timestamp
	}

	renderPosts() {
		const { context } = this.props

		if (this.state.createPost) {
			return <Redirect push to='/CreatePost' />
		}

		if (this.state.localPosts) {
			return (
				<div className='timeline'>
					<div style={{ marginTop: '20px' }}>
						Welcome {this.props.context.userName}!
						<br />
						{this.props.context.isSignedIn === 'true' && (
							<Button
								variant='primary'
								style={{ background: '#449955' }}
								onClick={() => this.setState({ createPost: true })}>
								Submit a Post
							</Button>
						)}
					</div>
					{this.state.localPosts.map((p) => (
						<div key={p.post_id}>
							<Post
								postID={p.post_id}
								title={p.title}
								link={p.link}
								upvotes={p.upvotes}
								user={p.username}
								//timeStamp={p.timeStamp}
								timeStamp={this.convertTimeStamp(p.createdAt)}
								comments={p.comments}
								index={this.state.localPosts.indexOf(p) + 1}
								context={context}
								description={p.description}
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
	}

	render() {
		return <div>{this.renderPosts()}</div>
	}
}
