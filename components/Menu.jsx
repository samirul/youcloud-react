import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const Menu = () => {
    const token = Cookies.get('access');
    const [personUser, setpersonUser] = useState('');
    const getUser = async () =>{
        if(token){
            const person = await axios.get('http://127.0.0.1:80/api/social/login/user/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setpersonUser(person);
        }
        
    }
    useEffect(()=>{
        getUser();
    },[])
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary fixed-top">
                <Container>
                    <Navbar.Brand href="/" className='nav-title'>You Cloud</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {token ? (<Nav className="me-auto">
                            <Nav.Link href="/logout">Logout</Nav.Link>
                        </Nav>) : (
                            <Nav className="me-auto">
                                <Nav.Link href="/login">Login</Nav.Link></Nav>
                        )}
                        
                        {personUser ? <Nav>Welcome Back: {personUser.data.user.username}</Nav> :
                        <nav></nav>}

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Menu
