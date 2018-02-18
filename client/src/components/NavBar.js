import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

class NavBar extends Component {

  render() {
    return (
      <Menu pointing secondary>
        <Menu.Item as={Link} to="/" name='Latest APOD' />
        <Menu.Item as={Link} to="/all" name='All APOD' />
        <Menu.Item as={Link} to="/random" name='Random APOD' />
      </Menu>
    );
  }
}

export default withRouter((NavBar));
