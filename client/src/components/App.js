import React, { Component } from 'react';
import NavBar from './NavBar';
import Apod from './Apod';
import Show from './Show'
import All from './All';
import NoMatch from './NoMatch';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <br/>
        <Switch>
          <Route exact path='/' component={Apod} />
          <Route exact path='/all' component={All} />
          <Route exact path='/:date' component={Show} />
          <Route component={NoMatch} />
        </Switch>
        <br/>
      </div>
    );
  }
}

export default App;
