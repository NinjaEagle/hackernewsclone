import React from 'react'
import { Card} from 'react-bootstrap'
import './css/Timeline.scss'
import {Link} from 'react-router-dom'
import { TriangleFill } from 'react-bootstrap-icons';


let dummyProjects = [
	{
        postID: 1323,
		title: "Fires ravage Northern california",
		link: 'https://www.cnet.com/',
        upvotes: 115,
        user: "nsm",
        timeStamp: "2 hours",
        comments: 54
    },
    {
        postID: 635,
		title: "FTC investigates TurboTax",
		link: 'https://www.foxnews.com/',
        upvotes: 284,
        user: "bookofjoe",
        timeStamp: "53 minutes",
        comments: 136
    },
    {
        postID: 32326,
		title: "Disney hit with backlash over 'Mulan' credits ",
		link: 'theHill.com',
        upvotes: 98,
        user: "justinpub",
        timeStamp: "4 hours",
        comments: 40
    },
    {
        postID: 3132,
		title: "Denver under winter storm watch",
		link: 'nypost.com',
        upvotes: 115,
        user: "LukeEF",
        timeStamp: "1 day",
        comments: 12
	}
];


export default class Timeline extends React.Component {

    handleUpvote = (e) => {
        e.preventDefault();
    }

	dummyRender() {
        let index = 1;
		return (
			<React.Fragment>
				{dummyProjects.map((p) => (
					<div key={p}>
						<Card className='posts'>
                            <Card.Header> 
                                <TriangleFill 
                                onClick={this.handleUpvote} 
                                size = {16}
                                style = {{cursor: 'pointer'}}
                                
                                />
                                &nbsp;
                                {index++}.
                            </Card.Header>
							<Card.Body className='postcards'>
								<Card.Title>
                                <a href={p.link}>{p.title}</a>
                                </Card.Title>
								<Card.Text>
                                    ({p.link})
                                </Card.Text>
							</Card.Body>
							<Card.Footer>
                            {p.upvotes} points by {p.user} {p.timeStamp} ago |  <Link to="">{p.comments} comments </Link>
							</Card.Footer>
						</Card>
					</div>
				))}
			</React.Fragment>
		)
	}

	render() {
		return <React.Fragment>{this.dummyRender()}</React.Fragment>
	}
}
