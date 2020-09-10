import React from 'react'

const AppContext = React.createContext()

class MyProvider extends React.Component {
	state = {
		// context variables
		user: {},
		posts: [],
		post: [],
		isSignedIn: false,

		// need to bind functions to keep simple syntax
		updateUser: (user) => this.updateUser(user),
		updatePosts: (posts) => this.updatePosts(posts),
		updateIsSignedIn: (isSignedIn) => this.updateIsSignedIn(isSignedIn),
	}

	// function defintions down here
	seeComments(posts) {
		this.setState({ posts })
	}

	seeOnePost(post) {
		this.setState({ post })
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
