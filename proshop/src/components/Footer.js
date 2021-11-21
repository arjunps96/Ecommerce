import React,{Fragment} from 'react';
import {Container,Row,Col} from 'react-bootstrap'

const Footer = () => {
    return (
        <Fragment>
            <Container>
           <Row>
               <Col className="text-center py-3">
                 <p>copyright &copy; prroshop</p>
               </Col>
           </Row>
           </Container>
        </Fragment>
    )
}

export default Footer
