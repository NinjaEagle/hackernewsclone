import React from 'react'

const AppContext = React.createContext()

class MyProvider extends React.Component {
	state = {
		// context variables
		user: {},
		posts: [],
		comments: [],
		isSignedIn: false,

		// need to bind functions to keep simple syntax
		updateUser: (user) => this.updateUser(user),
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

	updateUser(user) {
		this.setState({ user })
	}

	updatePosts(addPosts) {
		this.setState({ posts: [...this.state.posts, addPosts] })
	}

	updateIsSignedIn(isSignedIn) {
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
