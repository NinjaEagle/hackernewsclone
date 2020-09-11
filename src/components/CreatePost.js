import React from 'react'
import { Card, Button, InputGroup, FormControl, FormGroup, FormLabel, Modal} from 'react-bootstrap'
import './css/CreatePost.css'
import {Redirect} from 'react-router-dom'
import backend from '../api/backend'

let count = 222;
let upvotesCount = 2;
export default class CreatePost extends React.Component {
	state = {
        title: "",
        url: "",
        description: "",
        show: false,
        submitComplete: false,
        showModal: false,
    }

    componentDidMount() {

    }

    createPost = async (event) => {
       // API call here 
       // most of the stuff below will be changed
       event.preventDefault();

        // let addPost =  {
        //     postID: 332424,
        //     title: this.state.title,
        //     link: this.state.url,
        //     upvotes: 33,
        //     user: this.props.context.user,
        //     timeStamp: '2 hours',
        //     comments: 9,
        // }

        const response = await backend.post('/createPost', {
			body: JSON.stringify({
				title: this.state.title,
                description: this.state.description,
                link: this.state.url,
                uid: this.props.context.user_id,
                username: this.props.context.userName

			}),
        })
        
        console.log(response);
        // count = count + 1;
        // upvotesCount = upvotesCount * 2;
        // console.log("WHAT");
        // this.props.context.updatePosts(addPost);
        this.setState({showModal: true});
    }

	render() {
        console.log(this.state.submitComplete);

        if (this.state.submitComplete) {
			return <Redirect push to="/LogIn" />;
		}

		return (
            <div className='CreatePost'>
                <Card style={{ width: '30rem', height: '34rem' }} bg='dark' text='light'>
					<Card.Body>
						<Card.Title>Submit a Post</Card.Title>
                    <form onSubmit={this.createPost}>
                    <FormGroup controlId='title'>
                        <FormLabel style={{ color: 'white' }}>Title</FormLabel>
                        <FormControl
                        autoFocus
                        type='title'
                        value={this.state.title}
                        onChange={(e) => this.setState({ title: e.target.value })}
						placeholder='Enter a title'/>
						</FormGroup>
                        <FormGroup controlId='url'>
                        <FormLabel style={{ color: 'white' }}>URL</FormLabel>
                        <FormControl
                        type='url'
                        value={this.state.url}
                        onChange={(e) => this.setState({ url: e.target.value })}
						placeholder='Enter the url'/>
						</FormGroup>
                        &nbsp;
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text>Enter a description </InputGroup.Text>
						  </InputGroup.Prepend>
							<FormControl
								as='textarea'
								aria-label='With textarea'
								value={this.state.description}
								onChange={(e) => this.setState({ description: e.target.value })}
							/>
						</InputGroup>
                       <div style={{ paddingTop: '15px' }}>
								<Card.Footer>
									<Button block size='large' type='submit' variant='danger'>
										Create Account
									</Button>
								</Card.Footer>
							</div>
						</form>
                        </Card.Body>
				</Card>

        <Modal show={this.state.showModal} onHide={()=> this.setState({showModal: false})}>
        <Modal.Header closeButton>
          <Modal.Title>Post Created Sucessfully</Modal.Title>
        </Modal.Header>
        <Modal.Body> {this.state.title} is now available on the front page</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=> {this.setState({submitComplete: true})}}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
			</div>
		)
	}
}