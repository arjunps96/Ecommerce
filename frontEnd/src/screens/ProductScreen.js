import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import Rating from '../components/Rating';
import {Row,Col,Image,ListGroup,Card,Button, FormControl} from 'react-bootstrap';

import {getproductDetails} from '../actions/productActions';

import {Link} from 'react-router-dom';


const ProductScreen = ({match,history}) => {
   
    const [Qty,setQty]=useState(1)
    const dispatch=useDispatch();
    const Product=useSelector(state=>state.productDetails.product);

    const addtocartHandler=()=>{
        history.push(`/cart/${match.params.id}?qty=${Qty}`)
    }

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
                   {Product.countInStock&&<ListGroup.Item>
                     <Row>
                       <Col className="py-2">Qty</Col>
                       <Col>
                        <FormControl as="select" value={Qty} onChange={(e)=>setQty(e.target.value)}>
                          {[...Array(Product.countInStock).keys()].map(x=><option key={x+1} value={x+1}>{x+1}</option>)}
                        </FormControl>
                       </Col>
                     </Row>
                    </ListGroup.Item>}
                   <ListGroup.Item>
                     <Button variant="dark" disabled={Product.countInStock===0} onClick={addtocartHandler}>
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
