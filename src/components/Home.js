import React, { Component } from 'react'

class Home extends Component {
  constructor(props) {
    super(props)

    if (this.props.currentUser !== null) {
      console.log("Logged in user: ", this.props.currentUser);
    }
  }

  render() {
    return (
      <div>
        <h1>Website Coming Soon.</h1>
      </div>
    )
  }
}

export default Home
