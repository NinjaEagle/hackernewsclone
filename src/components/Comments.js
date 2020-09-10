import React from "react";
import { Link } from "react-router-dom";
import { Card, Form } from "react-bootstrap";
import { TriangleFill } from "react-bootstrap-icons";
import "./css/Comment.css";

function Comments(props) {
  let p = props.posts;
  let index = 1;
  // console.log(props)
  // componentDidMount(){
  //   let post = this.context
  // }
  return (
    <div>
      <div>
        <Form className="form">
          <Form.Control className="textbox" rows="3" />
          <Link
            className="combutton"
            to="/Login"
            type="submit"
            value="add comment"
          >
            Add Comment
          </Link>
        </Form>
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
  );
}

export default Comments;
