import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

class _NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2,

      //
      username:null,
      data:null
    };

    //this.userLogin();
  }

  render() {
    return (
      <div className="navbar">

        <Navbar bg="light">
          <Navbar.Brand>Wuhan Virus</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#">login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br />
        
      </div>
    )
  }

}

// export default {
//     routeProps: {
//         path: '/',
//         exact: true,
//         component: _NavBar,
//     },
//     name: '_NavBar',
// };
export default _NavBar;
