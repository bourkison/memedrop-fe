import React, { Component } from 'react';
import Post from './Post';
import axios from 'axios';

const FRONTENDURL = 'http://localhost:3000';
const BACKENDURL = 'http://localhost:3001';


class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postsArr: []
    }

    this.getPosts();
  }

  getPosts() {
    var temp = [];

    axios.get(`${BACKENDURL}/posts`, {withCredentials: true}).then(function(result) {
      for (var i = 0; i < result.data.length; i++) {
        temp.push(<Post key={i} content={result.data[i].content} />)
      }

      this.setState( {postsArr: temp} )
    }.bind(this))
  }


  render() {
    if (this.state.postsArr.length !== 0) {
      return (
        <div>
          {this.state.postsArr}
        </div>
      )
    } else {
      return (
        <p><i>There are no posts. Try following people or posting your own!</i></p>
      )
    }
  }


}

export default Feed;
