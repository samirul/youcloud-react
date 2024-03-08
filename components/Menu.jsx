import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Menu = () => {
    const access_key = localStorage.getItem('key')
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary fixed-top">
                <Container>
                    <Navbar.Brand href="/">You Cloud</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {access_key ? (<Nav className="me-auto">
                            <Nav.Link href="/logout">Logout</Nav.Link>
                        </Nav>) : (
                            <Nav className="me-auto">
                                <Nav.Link href="/login">Login</Nav.Link></Nav>
                        )}
                        
                        <Nav>Welcome Back: sds</Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Menu
