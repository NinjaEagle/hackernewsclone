import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { MyProvider, AppContext } from './context'
import Navbar from '../components/Navbar'
import Timeline from '../components/Timeline'
import Login from '../components/Login'
import SignUp from '../components/Signup'
import Comments from '../components/Comments'

export default class App extends React.Component {
	render() {
		return (
			<div className='App'>
				<BrowserRouter>
					<MyProvider>
						<AppContext.Consumer>
							{(context) => {
								return (
									<React.Fragment>
										<Navbar />
										<Route
											path='/'
											exact
											component={(props) => <Timeline {...props} {...context} />}
										/>
										<Route
											path='/Signup'
											exact
											component={(props) => <SignUp {...props} {...context} />}
										/>
										<Route
											path='/Login'
											exact
											component={(props) => <Login {...props} {...context} />}
										/>
										<Route
											path='/Comments'
											exact
											component={(props) => <Comments {...props} {...context} />}
										/>
									</React.Fragment>
								)
							}}
						</AppContext.Consumer>
					</MyProvider>
				</BrowserRouter>
			</div>
		)
	}
}
