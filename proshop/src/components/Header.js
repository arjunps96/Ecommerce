import React,{Fragment} from 'react';
import {Container,Navbar,Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const Header = () => {
    return (
        
            <>
  <Navbar bg="dark" variant="dark">
    <Container>
    <LinkContainer to="/">
      <Navbar.Brand >Proshop</Navbar.Brand>
    </LinkContainer>
    <Nav className="ml-auto">
      <LinkContainer to="/cart">
        <Nav.Link > <i class="fas fa-shopping-cart"></i> 
          cart
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to="#features">
        <Nav.Link ><i class="fas fa-user"></i>sign in</Nav.Link>
      </LinkContainer>
      
    </Nav>
    </Container>
  </Navbar>
  
</>
        
    )
}

export default Header
