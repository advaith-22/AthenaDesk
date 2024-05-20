import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react'
import '../styles/header.component.css'
import { useState } from "react";
import axios from 'axios'
import logo from '../assets/logo.png'

function Header () {

    const isLoggedIn = window.localStorage.getItem('token');
    const [user, setUser] = useState("")
    if (isLoggedIn) {
            axios.get("http://localhost:2248/user/", {
                    headers: {
                        "x-access-token": localStorage.getItem("token")
                    }
                }).then((res)=>{setUser(res.data)})
    }
    
    const navbar = (
    <Navbar expand='lg' className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className='d-flex align-items-center'>
            <img src={logo} alt="logo" width="30" height="50" className="d-inline-block align-text-top"/>{' '}
            AthenaDesk
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='me-auto'>
                <Nav.Link href="/">Dashboard</Nav.Link>
                <Nav.Link href="/createticket">Create Ticket</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
            <Nav className='me-2'>
                <Nav.Link href="/login" style={{visibility: isLoggedIn ? "hidden" : "visible"}}>
                    Sign-in
                </Nav.Link>

                <Nav.Link href="/register" style={{visibility: isLoggedIn ? "hidden" : "visible"}}>
                    Sign-up
                </Nav.Link>

                <NavDropdown title={user} id="basic-nav-dropdown" style={{visibility: isLoggedIn ? "visible" : "hidden"}}>
                    <NavDropdown.Item onClick={() => {window.localStorage.clear(); window.location.reload()}}>Logout</NavDropdown.Item>
                    </NavDropdown>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
    return navbar
}

export default Header