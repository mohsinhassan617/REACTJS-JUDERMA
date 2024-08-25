// src/components/Header.js

import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../image/logo.png'; // Update the path as needed

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);

  return (
    <Navbar
      className={`navbar-custom ${expanded ? 'expanded' : ''}`}
      expand="lg"
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand className="platypi-title">
          <img src={logo} alt="Logo" className="logo" />
          <span>Skin Disease Diagnosis</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={handleToggle}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="nav-container">
            <Nav className="navbar-nav">
              <LinkContainer to="/home">
                <Nav.Link onClick={() => setExpanded(false)}>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/upload">
                <Nav.Link onClick={() => setExpanded(false)}>Upload</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/history">
                <Nav.Link onClick={() => setExpanded(false)}>History</Nav.Link>
              </LinkContainer>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
