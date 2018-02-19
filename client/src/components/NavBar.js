import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NavBar extends Component {

  render() {
    return (
      <Menu pointing secondary>
        <Menu.Item as={Link} to="/apod/latest" name='Latest APOD' />
        <Menu.Item as={Link} to="/apod/all" name='APOD Collection' />
      </Menu>
    );
  }
}

export default NavBar