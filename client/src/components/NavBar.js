import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

class NavBar extends Component {

  render() {
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item as={Link} to="/" name='Latest APOD' />
          <Menu.Item as={Link} to="/all" name='All APOD' />
          <Menu.Item as={Link} to="/random" name='Random APOD' />
        </Menu>
      </div>
    );
  }
}

export default withRouter((NavBar));
