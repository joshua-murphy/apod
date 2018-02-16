import React, { Component } from 'react';
import NavBar from './NavBar';
import Latest from './Latest';
import Random from './Random';
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
          <Route exact path='/' component={Latest} />
          <Route exact path='/all' component={All} />
          <Route exact path='/random' component={Random} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
