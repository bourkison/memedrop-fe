import React, { Component } from 'react'
import NewPost from './NewPost';
import Feed from './Feed';

class Home extends Component {
  constructor(props) {
    super(props)
    if (this.props.currentUser !== null) {
      console.log("Logged in user: ", this.props.currentUser);
    }
  }

  render() {
    if (this.props.currentUser !== null) {
      return (
        <div>
          <h1>Welcome {this.props.currentUser.first_name}</h1>
          <NewPost />
          <Feed currentUser={this.props.currentUser} />
        </div>
      )
    } else {
      return (
        <div>
          <h1>Website Coming Soon.</h1>
        </div>
      )
    }
  }
}

export default Home
