import React from 'react'

const AppContext = React.createContext()

class MyProvider extends React.Component {
	state = {
		// context variables
		userName: sessionStorage.getItem("userName"),
		user_id: sessionStorage.getItem("user_id"),
		posts: sessionStorage.getItem("posts"),
		comments: sessionStorage.getItem("comments"),
		isSignedIn: sessionStorage.getItem("isSignedIn"),
		text: sessionStorage.getItem("isSignedIn"),

		// need to bind functions to keep simple syntax
		updateText: (text) => this.updateText(text),
		initPosts: (initPosts) => this.initPosts(initPosts),
		updateUser_id: (user_id) => this.updateUser_id(user_id),
		updateUsername: (userName) => this.updateUsername(userName),
		updatePosts: (posts) => this.updatePosts(posts),
		updateIsSignedIn: (isSignedIn) => this.updateIsSignedIn(isSignedIn),
		newComment: (comment) => this.newComment(comment),
	}

	initPosts(initPosts) {
		sessionStorage.setItem("posts", JSON.stringify(initPosts));
		this.setState({ posts: initPosts });
	}

	updateText(text) {
		sessionStorage.setItem("text", text);
		this.setState({ text });
	}

	updateUser_id(user_id) {
		sessionStorage.setItem("user_id", user_id);
		this.setState({ user_id })
	}

	updateUsername(userName) {
		sessionStorage.setItem("userName", userName);
		this.setState({ userName })
	}

	updatePosts(addPosts) {
		sessionStorage.setItem("addPosts", JSON.stringify([...this.state.posts, addPosts]));
		this.setState({ posts: [...this.state.posts, addPosts] })
	}

	updateIsSignedIn(isSignedIn) {
		sessionStorage.setItem("isSignedIn", isSignedIn);
		this.setState({ isSignedIn })
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

// let dummyPosts = [
// 	{
// 		postID: 1323,
// 		title: 'Fires ravage Northern california',
// 		link: 'https://www.cnet.com/',
// 		upvotes: 115,
// 		user: 'nsm',
// 		timeStamp: '2 hours',
// 		comments: 132,
// 	},
// 	{
// 		postID: 635,
// 		title: 'FTC investigates TurboTax',
// 		link: 'https://www.foxnews.com/',
// 		upvotes: 284,
// 		user: 'bookofjoe',
// 		timeStamp: '53 minutes',
// 		comments: 136,
// 	},
// 	{
// 		postID: 32326,
// 		title: "Disney hit with backlash over 'Mulan' credits ",
// 		link: 'theHill.com',
// 		upvotes: 98,
// 		user: 'justinpub',
// 		timeStamp: '4 hours',
// 		comments: 40,
// 	},
// 	{
// 		postID: 3132,
// 		title: 'Denver under winter storm watch',
// 		link:
// 			'https://www.msn.com/en-us/weather/topstories/denver-is-under-a-winter-storm-watch-two-days-after-the-city-hit-101-degrees/ar-BB18NKui',
// 		upvotes: 115,
// 		user: 'LukeEF',
// 		timeStamp: '1 day',
// 		comments: 12,
// 	},
// ]
