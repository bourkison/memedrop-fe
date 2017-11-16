import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
class Header extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    if (this.props.currentUser !== null) {
      return (
        <header>
          <nav>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/edit'>Edit Profile</Link></li>
              <li><Link to='logout'>Logout</Link></li>
            </ul>
          </nav>
        </header>
      )
    } else {
      return (
        <header>
          <nav>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/signup'>Signup</Link></li>
            </ul>
          </nav>
        </header>
      )
    }
  }
}

export default Header
