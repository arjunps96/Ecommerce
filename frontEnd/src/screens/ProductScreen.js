import React,{useState,useEffect} from 'react';

import Rating from '../components/Rating';
import {Row,Col,Image,ListGroup,Card,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

const ProductScreen = ({match}) => {
    
    const [Product,setProduct]=useState({});

    useEffect(()=>{
      const getProducts=async()=>{
        const {data}=await axios.get(`/api/products/${match.params.id}`)
        setProduct(data);
    }
    getProducts()
    },[match.params.id])

    return (
        <>
           <Link className="btn btn-dark my-3" to="/">Go Back</Link>
           <Row>
             <Col md={6}>
             <  Image src={Product.image} fluid/>
             </Col>
             <Col md={3}>
               <ListGroup variant="flush">
                 <ListGroup.Item>
                   <h3>{Product.name}</h3>
                 </ListGroup.Item>
                 <ListGroup.Item>
                   <Rating value={Product.rating} text={`${Product.numReviews} reviews`}/>
                 </ListGroup.Item>
                 <ListGroup.Item>
                   {Product.description}
                 </ListGroup.Item>
                 
                 
               </ListGroup>
             </Col>
             <Col md={3}>
               <Card>
                 <ListGroup variant="flush">
                   <ListGroup.Item>
                     Price: $ <strong>{Product.price}</strong>
                   </ListGroup.Item>
                   <ListGroup.Item>
                     {Product.countInStock>0?'In Stock':'Out Of Stock'}
                   </ListGroup.Item>
                   <ListGroup.Item>
                     <Button variant="dark" disabled={Product.countInStock===0}>
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
