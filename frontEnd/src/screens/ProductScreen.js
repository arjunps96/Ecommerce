import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import Rating from '../components/Rating';
import {Row,Col,Image,ListGroup,Card,Button} from 'react-bootstrap';

import {getproductDetails} from '../actions/productActions';

import {Link} from 'react-router-dom';


const ProductScreen = ({match}) => {
    
    const dispatch=useDispatch(getproductDetails());
    const Product=useSelector(state=>state.productDetails.product);

    useEffect(()=>{
      dispatch(getproductDetails(match.params.id))
    },[match.params.id,dispatch])

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
