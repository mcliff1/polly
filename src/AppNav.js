import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Media as StrapMedia,
  Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
//import Media from 'react-media';


class AppNav extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
    return (
      <div>
      <Media query="(max-width: 600px)">
        {matches =>
          matches ? ( /* small screen nav */
      <Navbar color="white" light expand="md">
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" nav>
        <NavItem>
          <NavLink to="/" tag={RRNavLink}>Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/history" tag={RRNavLink}>History</NavLink>
        </NavItem>
        </Nav>
        </Collapse>
      </Navbar>

    ) : (    /* now begin large document nav */
      <Navbar color="white" className="nav" expand>
        <Nav navbar>
        <NavItem>
          <NavLink to="/" tag={RRNavLink}>Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/history" tag={RRNavLink}>History</NavLink>
        </NavItem>
        </Nav>
      </Navbar>

    )}
      </Media>
      </div>


    );
  }
}

export default AppNav;
