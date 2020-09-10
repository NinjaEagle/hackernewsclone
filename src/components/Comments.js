import React from 'react'
import { Card } from 'react-bootstrap'
import { TriangleFill } from 'react-bootstrap-icons'
import './css/Comment.css'

function Comments(props) {
	let p = props.posts
	let index = 1
	// console.log(props)
	// componentDidMount(){
	//   let post = this.context
	// }
	return (
		<div>
			<div>Comments Page</div>
			<div>
				<form className='commentForm'>
					<input type='text' placeholder='Say something...' />
					<input type='submit' value='add comment' />
				</form>
			</div>
		</div>
		// <div key={p.postID}>
		// 	Comments Page
		// 	<Card className='comments'>
		// 		<Card.Header>
		// 			<TriangleFill
		// 				onClick={this.handleUpvote}
		// 				size={16}
		// 				style={{ cursor: 'pointer' }}
		// 			/>
		// 			{index++}.
		// 		</Card.Header>
		// 		<Card.Body className='postcards'>
		// 			<Card.Title onClick={this.handleLink(p.link)}>
		// 				<a href={p.link}>{p.title}</a>
		// 			</Card.Title>
		// 			<Card.Text>({p.link})</Card.Text>
		// 		</Card.Body>
		// 		<Card.Footer>
		// 			{p.upvotes} points by {p.user} {p.timeStamp} ago |{' '}
		// 			{/* <Link to='/Comments' post={p}>
		// 				{p.comments} comments{' '}
		// 			</Link> */}
		// 		</Card.Footer>
		// 	</Card>
		// </div>
	)
}

export default Comments
