import React from 'react';
import { Redirect } from 'react-router';
import { Button, Card, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import './css/SignUp.css'

export default class SignUp extends React.Component {
    state = {
        email: "",
        password: "",
        confirmPassword: "",
        redirect: false
    };

    
    //  link up api calls and input validation
    createAccount = async event => {
      // this.setState({redirect: true}); // for demoing

    }
    

    render() {
      if (this.state.redirect) {
        return <Redirect push to="/Login" />;
       }

        return (
            <div className="SignUp" >
            <Card style = {{ width: '30rem', height: '34rem'}} bg ='dark' text='light'>
              <Card.Body>
               <Card.Title>Sign Up</Card.Title>
              <form onSubmit={this.createAccount}>
              <FormGroup controlId="name">
                  <FormLabel style = {{color: 'white'}}>Name</FormLabel>
                  <FormControl
                    autoFocus
                    type="name"
                    value={this.state.name}
                    onChange={e => this.setState({name: e.target.value})}
                    placeholder="Enter your name"
                  />
                </FormGroup>

                <FormGroup controlId="email">
                  <FormLabel style = {{color: 'white'}}>Email</FormLabel>
                  <FormControl
                    autoFocus
                    type="email"
                    value={this.state.email}
                    onChange={e => this.setState({email: e.target.value})}
                    placeholder="Enter Email"
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