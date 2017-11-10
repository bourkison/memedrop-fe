import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';

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
      <main>
        <Switch>
          <Route exact path='/' render={(props) => ( <Home currentUser={this.state.currentUser}/> )}/>
          <Route exact path='/login' render={(props) => ( <Login setUser={this.setUser}/> )} />
          <Route exact path='/signup' component={SignUp}/>
        </Switch>
      </main>
    )
  }
}

export default Main
