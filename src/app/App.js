import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {MyProvider, AppContext} from './context';
import Navbar from '../components/Navbar'
import Home from '../components/Home'

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
                <Navbar/>
                <Route path="/" exact component={ props => <Home {...props} {...context} />} />
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