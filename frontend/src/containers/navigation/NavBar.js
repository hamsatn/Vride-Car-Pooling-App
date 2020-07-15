import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/trips">
          <img
            alt=""
            src="/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          VRide Car Pooling
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: {JSON.parse(localStorage.getItem('user'))?.username || 'anonymous'} (<Link to="/logout">Sign out</Link>)
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
