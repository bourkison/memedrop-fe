import React, { Component } from 'react';
import axios from 'axios';

const FRONTENDURL = 'http://localhost:3000';
const BACKENDURL = 'http://localhost:3001';

class SignUp extends Component {
  constructor(props) {
    super(props);

    console.log(this.props);

    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      dob: '',
      signUpErrors: []
    };

    // Let's set the default value of the input field to be equal to 16 years old.
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    this.state.dob = `${yyyy - 16}-${mm}-${dd}`;

    // Let's bind all functions to this.
    this._handleFirstNameChange = this._handleFirstNameChange.bind(this);
    this._handleLastNameChange = this._handleLastNameChange.bind(this);
    this._handleUsernameChange = this._handleUsernameChange.bind(this);
    this._handleEmailChange = this._handleEmailChange.bind(this);
    this._handlePassChange = this._handlePassChange.bind(this);
    this._handlePassConfChange = this._handlePassConfChange.bind(this);
    this._handleBirthdayChange = this._handleBirthdayChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleFirstNameChange(e) {
    this.setState( {firstName: e.target.value} )
  }

  _handleLastNameChange(e) {
    this.setState( {lastName: e.target.value} )
  }

  _handleUsernameChange(e) {
    this.setState( {username: e.target.value} )
  }

  _handleEmailChange(e) {
    this.setState( {email: e.target.value} )
  }

  _handlePassChange(e) {
    this.setState( {password: e.target.value} )
  }

  _handlePassConfChange(e) {
    this.setState( {passwordConfirmation: e.target.value} )
  }

  _handleBirthdayChange(e) {
    this.setState( {dob: e.target.value} )
  }

  _handleSubmit(e) {
    e.preventDefault();

    // Let's submit a post request to back-end to create user in database.
    axios.post(`${BACKENDURL}/users`, {
      user: {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation,
        dob: this.state.dob
      }
    },
    {
      withCredentials: true
    }).then(function (result) {
      // If there is an error on the server side, the JSON object will only return the variables there were errors with, hence it will never return an id. Thus we can check for status of the id to see if it all went well on server side.
      if (result.data.id === undefined) {
        var errArr = []
        for (var i = 0; i < result.data.length; i++) {
          errArr.push(<li key={i}>{result.data[i]}</li>);
        }

        this.setState( { signUpErrors: errArr } );

        return;
      }
      // TODO: Make it so when you sign up it instantly signs you in.
      this.setState( { signUpErrors: [] } );

      window.location.replace(FRONTENDURL);
    }.bind(this))
  }



  render() {
    return (
      <div className="signUp">
        <h2>Sign Up!</h2>
        <ul>{ this.state.signUpErrors }</ul>
        <form onSubmit={this._handleSubmit}>
          <fieldset>
            <label htmlFor="fNameInput">First Name</label>
            <input id="fNameInput" type="text" placeholder="First Name" onInput={ this._handleFirstNameChange } autoFocus required/>
          </fieldset>
          <fieldset>
            <label htmlFor="lNameInput">Last Name</label>
            <input id="lNameInput" type="text" placeholder="Last Name" onInput={this._handleLastNameChange} required />
          </fieldset>
          <fieldset>
            <label htmlFor="unInput">Username (maximum length 30 characters)</label>
            <input id="unInput" type="text" placeholder="Username" onInput={this._handleUsernameChange} required />
          </fieldset>
          <fieldset>
            <label htmlFor="emailInput">Email</label>
            <input id="emailInput" type="email" placeholder="Email" onInput={this._handleEmailChange} required />
          </fieldset>
          <fieldset>
            <label htmlFor="pwInput">Password (minimum length 6 characters)</label>
            <input id="pwInput" type="password" placeholder="Password" onInput={this._handlePassChange} required/>
          </fieldset>
          <fieldset>
            <label htmlFor="pwConfInput">Confirm Password</label>
            <input id="pwConfInput" type="password" placeholder="Confirm Password" onInput={this._handlePassConfChange} required/>
          </fieldset>
          <fieldset>
            <label htmlFor="dateInput">Date of Birth</label>
            <input id="dateInput" type="date" onChange={this._handleBirthdayChange} defaultValue={this.state.dob} required />
          </fieldset>

          <button type="submit" method="post">Sign Up!</button>
        </form>
      </div>
    )
  }
}

export default SignUp
