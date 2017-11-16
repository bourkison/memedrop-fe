import React, { Component } from 'react';
import axios from 'axios';

const FRONTENDURL = 'http://localhost:3000';
const BACKENDURL = 'http://localhost:3001';


class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    }

    this._handleContentChange = this._handleContentChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleContentChange(e) {
    this.setState( {content: e.target.value} );
  }

  _handleSubmit(e) {
    e.preventDefault();

    axios.post(`${BACKENDURL}/posts`, {
      post: {
        content: this.state.content
      }
    },
    {
      withCredentials: true
    }).then(function(result) {
      console.log(result);
    }.bind(this))
  }

  render() {
    return (
      <div className="newPostForm">
        <form onSubmit={this._handleSubmit}>
          <input type='text' placeholder='New Post' onInput={this._handleContentChange} />
          <button type='submit' method='post'>New Post</button>
        </form>
      </div>
    )
  }
}

export default NewPost;
