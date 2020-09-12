import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import Post from './Post'
import backend from '../api/backend'

export default class Profile extends Component {

	state = {
		localPosts: [],
		localUpvotes: [],
	}

	async componentDidMount() {
		console.log(this.props.context.user_id);
		const response = await backend.post('/getUserProfile', {
			body: JSON.stringify({
				user_id: this.props.context.user_id
			}),
		})
		this.setState({ localPosts: response.data.user.posts.reverse() })
		this.setState({ localUpvotes: response.data.user.upvotes.reverse() })
	}

	convertTimeStamp(stamp) 
	{
		let temp = new Date(stamp);
		let date = temp.getFullYear()+'-'+(temp.getMonth()+1)+'-'+temp.getDate();
		let time = temp.getHours() + ":" + temp.getMinutes() + ":" + temp.getSeconds();
		let timestamp = date+' '+time;
		return timestamp;
	}

	render() {
		const { context } = this.props
		return (
		<div>
			<h1>Hello {this.props.context.userName} welcome to Hacker News Profile !</h1>

            <h2>Here are the posts you submitted</h2>
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
			{/* <h2>Here are the posts you upvoted</h2> */}
			{/* {this.state.localUpvotes.map((p) => (
					<div key={p.title}>
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
							hasUpvoted = {true}
						/>
					</div>
				))}  */}
		</div>);

		
	}
}
