import React from 'react'
import './css/Timeline.scss'
import { Link } from 'react-router-dom'
import SubmitPost from './SubmitPost'

import Post from './Post'

let dummyProjects = [
	{
		postID: 1323,
		title: 'Fires ravage Northern california',
		link: 'https://www.cnet.com/',
		upvotes: 115,
		user: 'nsm',
		timeStamp: '2 hours',
		comments: 54,
	},
	{
		postID: 635,
		title: 'FTC investigates TurboTax',
		link: 'https://www.foxnews.com/',
		upvotes: 284,
		user: 'bookofjoe',
		timeStamp: '53 minutes',
		comments: 136,
	},
	{
		postID: 32326,
		title: "Disney hit with backlash over 'Mulan' credits ",
		link: 'theHill.com',
		upvotes: 98,
		user: 'justinpub',
		timeStamp: '4 hours',
		comments: 40,
	},
	{
		postID: 3132,
		title: 'Denver under winter storm watch',
		link:
			'https://www.msn.com/en-us/weather/topstories/denver-is-under-a-winter-storm-watch-two-days-after-the-city-hit-101-degrees/ar-BB18NKui',
		upvotes: 115,
		user: 'LukeEF',
		timeStamp: '1 day',
		comments: 12,
	},
]

export default class Timeline extends React.Component {
	state = {
		index: 0,
	}

	dummyRender() {
		return (
			<div className='timeline'>
				{dummyProjects.map((p) => (
					<div key={p.postID}>
						<Post
							post={p}
							postID={p.postID}
							title={p.title}
							link={p.link}
							upvotes={p.upvotes}
							user={p.user}
							timeStamp={p.timeStamp}
							comments={p.comments}
							index={dummyProjects.indexOf(p) + 1}
							context={this.props.context}
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
		return (
			<div className='timeline'>
				<SubmitPost />
				{this.dummyRender()}
			</div>
		)
	}
}
