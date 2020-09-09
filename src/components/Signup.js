import React from 'react';
import { Redirect } from 'react-router';
import { Button, Card, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import './css/SignUp.css'
import backend from '../api/backend'

export default class SignUp extends React.Component {
    state = {
        userName: "",
        password: "",
        confirmPassword: "",

        noMatch: false,
        redirect: false
    };

    
    //  link up api calls and input validation
    createAccount = async event => {
      // this.setState({redirect: true}); // for demoing

      event.preventDefault();
      // if (this.state.password !== this.state.confirmPassword) {
      //   this.setState({noMatch: true})
      //   return;
      // }
      event.preventDefault()
      const response = await backend.post('/createPost', {
        body: JSON.stringify({ title: "title", description: "desc", link: "link", uid: "uid" }),
      });
      console.log(response)
    }
    

    render() {
      if (this.state.redirect) {
        return <Redirect push to="/Login" />;
       }

        return (
            <div className="SignUp" >
              {this.state.noMatch === true && <h5>Password and Confirm Password do not match</h5>}
            <Card style = {{ width: '30rem', height: '34rem'}} bg ='dark' text='light'>
              <Card.Body>
               <Card.Title>Sign Up</Card.Title>
              <form onSubmit={this.createAccount}>

                <FormGroup controlId="userName">
                  <FormLabel style = {{color: 'white'}}>Username</FormLabel>
                  <FormControl
                    autoFocus
                    type="userName"
                    value={this.state.userName}
                    onChange={e => this.setState({userName: e.target.value})}
                    placeholder="Enter a username"
                  />
                </FormGroup>

                <FormGroup controlId="password">
                  <FormLabel style = {{color: 'white'}}>Password</FormLabel>
                  <FormControl
                    value={this.state.password}
                    onChange={e => this.setState({password: e.target.value})}
                    placeholder="Enter password"
                    type="password"
                  />
                </FormGroup>
                <FormGroup controlId="confirmPassword">
                  <FormLabel style = {{color: 'white'}}>Confirm Password</FormLabel>
                  <FormControl
                    value={this.state.confirmPassword}
                    onChange={e => this.setState({confirmPassword: e.target.value})}
                    placeholder="Confirm password"
                    type="password"
                  />
                </FormGroup>

                <div style ={{paddingTop: '15px'}}>
                <Card.Footer>
                <Button
                  block
                  size="large"
                  type="submit"
                  variant="danger"
                >
                  Create Account
                </Button>
                </Card.Footer>
                </div>
                </form>
             </Card.Body>
            </Card>
          </div>
        );
    }
}