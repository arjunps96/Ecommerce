import React from 'react';
import {Card} from 'react-bootstrap';
import Rating from './Rating';

const Product = ({products}) => {
    return (
        <>
        <Card className="py-3 my-3 rounded">
            
            <a href={`/products/${products._id}`}>
                <Card.Img src={products.image} />
            </a>
            <Card.Body as='div'>
                <a href={`/products/${products._id}`}>
                    <Card.Title>{products.name}</Card.Title>
                </a>
                <Rating value={products.rating} text={`${products.numReviews} Reviews`}/>
                <Card.Text as='h3'>$ {products.price}</Card.Text>

            </Card.Body>
                
            

        </Card>
            
        </>
    )
}

export default Product
