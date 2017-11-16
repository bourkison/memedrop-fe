import React, { Component } from 'react';
import axios from 'axios';

const FRONTENDURL = 'http://localhost:3000';
const BACKENDURL = 'http://localhost:3001';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', loginErrors: [] };

    this._handleChangeUsername = this._handleChangeUsername.bind(this);
    this._handleChangePassword = this._handleChangePassword.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleChangeUsername(e) {
    this.setState( {username: e.target.value} );
  }

  _handleChangePassword(e) {
    this.setState( {password: e.target.value} )
  }

  _handleSubmit(e) {
    e.preventDefault();

    axios.post(`${BACKENDURL}/login`, {
      username: this.state.username,
      password: this.state.password
    },
    {
      withCredentials: true
    }).then(function (result) {
      if (result.data.errors !== undefined) {
        var errArr = [];

        for (var i = 0; i < result.data.errors.length; i++ ) {
          errArr.push(<li key={i}>{result.data.errors[i]}</li>)
        }
        this.setState( { loginErrors: errArr } );

        return;
      }

      this.setState( { loginErrors: [] } );
      // Set current user through this function.
      this.props.setUser(result.data);
      this.props.history.push('/');
    }.bind(this));
  }

  render() {
    return (
      <div className="signIn">
        <form onSubmit={ this._handleSubmit }>
          <h2>Login</h2>
          <ul>{ this.state.loginErrors }</ul>
          <input type="text" placeholder="Email/Username" onChange={this._handleChangeUsername} value={this.state.username} required autoFocus />
          <input type="password" placeholder="Password" onChange={this._handleChangePassword} value={this.state.password} required />
          <button type="submit" method="post">Sign In</button>
        </form>
      </div>
    )
  }
}

export default Login;
