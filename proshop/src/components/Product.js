import React from 'react';
import {Card} from 'react-bootstrap';

const Product = ({products}) => {
    return (
        <>
        <Card className="py-3 my-3 rounded">
            
            <a href={`/products/${products._id}`}>
                <Card.Img src={products.image} />
            </a>
            <Card.Body>
                <a href={`/products/${products._id}`}>
                    <Card.Title>{products.name}</Card.Title>
                </a>
                <Card.Text>{products.description}</Card.Text>

            </Card.Body>
                
            

        </Card>
            
        </>
    )
}

export default Product
