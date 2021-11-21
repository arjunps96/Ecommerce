import React,{Fragment} from 'react';
import {Container,Navbar,Nav} from 'react-bootstrap';

const Header = () => {
    return (
        
            <>
  <Navbar bg="dark" variant="dark">
    <Container>
        
    <Navbar.Brand href="#home">Proshop</Navbar.Brand>
    <Nav className="ml-auto">
      <Nav.Link href="#home"> <i class="fas fa-shopping-cart"></i> 
          cart</Nav.Link>
      <Nav.Link href="#features"><i class="fas fa-user"></i>sign in</Nav.Link>
      
    </Nav>
    </Container>
  </Navbar>
  
</>
        
    )
}

export default Header
