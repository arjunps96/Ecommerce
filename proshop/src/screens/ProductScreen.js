import React from 'react';
import Products from '../products';
import Rating from '../components/Rating';
import {Row,Col,Image,ListGroup,Card,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';


const ProductScreen = ({match}) => {
    const product=Products.find(product=>product._id===match.params.id)

    return (
        <>
           <Link className="btn btn-dark my-3" to="/">Go Back</Link>
           <Row>
             <Col md={6}>
             <  Image src={product.image} fluid/>
             </Col>
             <Col md={3}>
               <ListGroup variant="flush">
                 <ListGroup.Item>
                   <h3>{product.name}</h3>
                 </ListGroup.Item>
                 <ListGroup.Item>
                   <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                 </ListGroup.Item>
                 <ListGroup.Item>
                   {product.description}
                 </ListGroup.Item>
                 
                 
               </ListGroup>
             </Col>
             <Col md={3}>
               <Card>
                 <ListGroup variant="flush">
                   <ListGroup.Item>
                     Price: $ <strong>{product.price}</strong>
                   </ListGroup.Item>
                   <ListGroup.Item>
                     {product.countInStock>0?'In Stock':'Out Of Stock'}
                   </ListGroup.Item>
                   <ListGroup.Item>
                     <Button variant="dark" disabled={product.countInStock===0}>
                       Add to Cart
                     </Button>
                   </ListGroup.Item>
                 </ListGroup>
               </Card>
             </Col>
           </Row>
           
        </>
    )
}

export default ProductScreen
