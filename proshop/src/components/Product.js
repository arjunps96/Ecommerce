import React from 'react';
import {Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';


const Product = ({products}) => {
    return (
        <>
        <Card className="py-3 my-3 rounded">
            
            <Link to={`/products/${products._id}`}>
                <Card.Img src={products.image} />
            </Link>
            <Card.Body as='div'>
                <Link to={`/products/${products._id}`}>
                    <Card.Title>{products.name}</Card.Title>
                </Link>
                <Rating value={products.rating} text={`${products.numReviews} Reviews`}/>
                <Card.Text as='h3'>$ {products.price}</Card.Text>

            </Card.Body>
                
            

        </Card>
            
        </>
    )
}

export default Product
