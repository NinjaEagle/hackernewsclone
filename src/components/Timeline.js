import React from 'react'
import { Card} from 'react-bootstrap'
import './css/Timeline.scss'
import {Link} from 'react-router-dom'

let dummyProjects = [
	{
        postID: 1323,
		title: "Fires ravage Northern california",
		link: 'https://www.cnet.com/',
        upvotes: 115,
        user: "nsm",
        timestamp: "2 hours",
        comments: 54
    },
    {
        postID: 635,
		title: "FTC investigates TurboTax",
		link: 'https://www.foxnews.com/',
        upvotes: 284,
        user: "bookofjoe",
        timestamp: "53 minutes",
        comments: 136
    },
    {
        postID: 32326,
		title: "Disney hit with backlash over 'Mulan' credits ",
		link: 'theHill.com',
        upvotes: 98,
        user: "justinpub",
        timestamp: "4 hours",
        comments: 40
    },
    {
        postID: 3132,
		title: "Denver under winter storm watch",
		link: 'nypost.com',
        upvotes: 115,
        user: "LukeEF",
        timestamp: "1 day",
        comments: 12
	}
];


export default class Timeline extends React.Component {
	dummyRender() {
        let index = 1;
		return (
			<React.Fragment>
				{dummyProjects.map((p) => (
					<div key={p}>
						<Card className='posts'>
                            <Card.Header>{index++}.</Card.Header>
							<Card.Body className='postcards'>
								<Card.Title>
                                    <Link to={p.link}>{p.title}</Link>
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
