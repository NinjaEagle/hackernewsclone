import React, { Component } from 'react'
import { Redirect } from 'react-bootstrap'
import './css/Comment.css'
import Timeline from './Timeline'
    
    export default class Comment extends Component {
      render() {
        return (
          <div>
              <form className="commentForm">
                <input type="text" placeholder="Say something..." />
                <input type="submit" value="add comment" />
              </form>
          </div>
        )
      }
    }
    