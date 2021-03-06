import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Header from './Header';
import Profile from './Profile';

const FRONTENDURL = 'http://localhost:3000';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    }
    this.setUser = this.setUser.bind(this);
  }

  setUser(u) {
    this.setState( { currentUser: u } )
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <main>
          <Switch>
            <Route exact path="/" render={(props) => (<Home currentUser={this.state.currentUser} {...props} />)} />
            <Route exact path='/login' render={(props) => ( <Login setUser={this.setUser} {...props} /> )} />
            <Route exact path='/signup' render={(props) => ( <SignUp setUser={this.setUser} {...props} /> )}/>
            <Route path="/profile/:username" render={(props) => (<Profile currentUser={this.state.currentUser} {...props} />)} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default Main
