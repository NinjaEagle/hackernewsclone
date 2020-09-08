import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {MyProvider, AppContext} from './context';
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import Login from '../components/Login'
import SignUp from '../components/Signup';

export default class App extends React.Component {
  render()  {
    return (
      <div className = "App">
        <BrowserRouter>
          <MyProvider>
            <AppContext.Consumer>
          {(context) => {
            return (
              <React.Fragment>
                <Navbar />
                <Route path="/" exact component={ props => <Home {...props} {...context} />} />
                <Route path="/Signup" exact component={ props => <SignUp {...props} {...context} />} />
                <Route path="/Login" exact component={ props => <Login {...props} {...context} />} />
              </React.Fragment>
            );
          }}
          </AppContext.Consumer>
          </MyProvider>
         </BrowserRouter>
      </div>
    );
  }
}