import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {

  render() {
    return (
      <Menu widths={2} style={{ position: 'fixed', top: 0, zIndex: 10 }}>
        <Menu.Item as={Link} to="/latest" name='Latest APOD' />
        <Menu.Item as={Link} to="/all" name='APOD Collection' />
      </Menu>
    );
  }
}

export default NavBar