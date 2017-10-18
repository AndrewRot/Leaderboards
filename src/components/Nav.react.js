import React, { Component } from 'react';
//import logo from './logo.svg';

//import *  as ReactBootstrap from 'react-bootstrap';
let Navbar = require("react-bootstrap/lib/Navbar");
let NavItem = require("react-bootstrap/lib/NavItem");
let Nav = require ("react-bootstrap/lib/Nav");
let NavDropdown = require("react-bootstrap/lib/NavDropdown");
let MenuItem = require("react-bootstrap/lib/MenuItem");
let FormGroup = require("react-bootstrap/lib/FormGroup");
let FormControl = require("react-bootstrap/lib/FormControl");
let Button = require("react-bootstrap/lib/Button");


//let require("react-bootstrap/lib/NavbarHeader");

//add hrefs back in to link menus

class Navigationmenu extends Component {
  render() {
    return (
      <div className="navbar">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>

            <Navbar.Brand>  
              <a > Leaderboards </a>
            </Navbar.Brand>
            
            <Navbar.Toggle />

          </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} >Browse</NavItem>
            <NavItem eventKey={2} >My Boards</NavItem>
            <NavDropdown eventKey={3} title="Docs" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>APIs</MenuItem>
              <MenuItem eventKey={3.2}>More APIs</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Other APIS</MenuItem>
            </NavDropdown>
          </Nav>

          <Navbar.Form pullRight>
            <FormGroup>
              <FormControl type="text" placeholder="Search" />
            </FormGroup>
            {' '}
            <Button type="submit">Submit</Button>
          </Navbar.Form>

          

        </Navbar.Collapse>
      </Navbar> 

      </div>
    );
  }
}

export default Navigationmenu;


/*

class Nav extends Component {
  render() {
    return (
      <div className="navigation">
        asdasd
      </div>
    );
  }
}

<Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a >React-Bootstrap</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} >Link</NavItem>
            <NavItem eventKey={2} >Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} >Link Right</NavItem>
            <NavItem eventKey={2} >Link Right</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar> 
*/