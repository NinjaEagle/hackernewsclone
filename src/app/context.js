import React from 'react'


const AppContext = React.createContext()

class MyProvider extends React.Component {
	state = {
		// context variables
		userName: "Dav",
		user_id: "",
		posts: [],
		comments: [],
		isSignedIn: false,
		text: "H",

		// need to bind functions to keep simple syntax
		updateText: (text) => this.updateText(text),

		initPosts: (initPosts) =>this.initPosts(initPosts),

		updateUser_id: (user_id) => this.updateUser_id(user_id),

		updateUsername: (userName) => this.updateUsername(userName),
		updatePosts: (posts) => this.updatePosts(posts),
		updateIsSignedIn: (isSignedIn) => this.updateIsSignedIn(isSignedIn),
		newComment: (comment) => this.newComment(comment),
	}

	// function defintions down here
	newComment(comment) {
		// if(!this.state.comments.includes(comment)){
		// 	const response = await backend.post('/addCommentToPost', {
		// 		body: JSON.stringify({
		// 			post_id: comment.post
		// 			username: this.state.userName.toLowerCase(),
		// 			password: this.state.password,
		// 		}),
		// 	})
		// }
		this.setState({ comments: [comment, ...this.state.comments] })
	}

	initPosts(initPosts) {
		this.setState({posts: initPosts});
	}

	updateText(text) {
		this.setState({ text });
	}

	updateUser_id(user_id) {
		this.setState({ user_id });
	}

	updateUsername(userName) {
		this.setState({ userName });
	}

	updatePosts(addPosts) {
		this.setState({ posts: [...this.state.posts, addPosts] });
		console.log(this.state.posts);
	}

	updateIsSignedIn(isSignedIn) {
		this.setState({ isSignedIn });
	}

	render() {
		return (
			<AppContext.Provider value={{ context: this.state }}>
				{this.props.children}
			</AppContext.Provider>
		)
	}
}

export { MyProvider, AppContext }


// dummy Projects below

let dummyPosts = [
	{
		postID: 1323,
		title: 'Fires ravage Northern california',
		link: 'https://www.cnet.com/',
		upvotes: 115,
		user: 'nsm',
		timeStamp: '2 hours',
		comments: 132,
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