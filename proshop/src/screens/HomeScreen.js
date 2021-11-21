import React from 'react';
import Product from '../products';
import Products from '../components/Product';
import { Row,Col } from 'react-bootstrap';

const HomeScreen = () => {
    return (
        <>
        <h1>Latest Products</h1>
        <Row>
            
            {Product.map(product=>

            <Col sm={12} md={6} lg={4} l={2}>
                <Products products={product}/>
            </Col>
                )}
            
            
        </Row>
          
        </>
    )
}

export default HomeScreen
