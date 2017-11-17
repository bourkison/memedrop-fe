import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';
import NewPost from './NewPost';

const FRONTENDURL = 'http://localhost:3000';
const BACKENDURL = 'http://localhost:3001';

var output = [];

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      postsArr: [],
      output: null
    }

    // console.log(props.match.params.username);
    this.getProfileInfo();
  }

  getProfileInfo() {
    axios.get(`${BACKENDURL}/users/${this.props.match.params.username}`).then(function(result) {
      var temp = [];

      this.setState( {user: result.data.user} );

      for (var i = 0; i < result.data.posts.length; i++) {
        temp.push(<Post key={i} content={result.data.posts[i].content} />)
      }

      this.setState( {postsArr: temp} )
    }.bind(this));
  }


  render() {
    output = [];

    // First check to see if it's loaded yet by seeihng how this.state.user is.
    if (this.state.user === null) {
      return (
        <h1>Loading...</h1>
      )
    } else {
      if (this.props.currentUser !== null && this.state.user.id === this.props.currentUser.id) {
        output.push(<NewPost key='np' />)
      }

      output.push(<h2 key='h'>{this.state.user.first_name} {this.state.user.last_name}</h2>)

      if (this.state.postsArr.length === 0) {
        output.push(<p key='p'><i>This user has no posts.</i></p>)
      } else {
        for (var i = 0; i < this.state.postsArr.length; i ++) {
          output.push(this.state.postsArr[i]);
        }
      }

      console.log("OUTPUT", output);

      return (
        <div>
          {output}
        </div>
      )
    }

  }
}

export default Profile;
