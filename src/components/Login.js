import React, { Component } from 'react';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };

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

    console.log(this.state.username, this.state.password);
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
