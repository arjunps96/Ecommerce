import React,{useEffect,} from 'react';


import Products from '../components/Product';
import { Row,Col } from 'react-bootstrap';



import {getAllproducts} from '../actions/productActions';
import { useDispatch,useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Alert from '../components/Alert';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList=useSelector(state=>state.productList);

    const {loading,products,error}=productList;

    useEffect(()=>{
        
        dispatch(getAllproducts());

        

    },[dispatch])

    return (
        <>
        <h1>Latest Products</h1>
        {loading&&<Loader/>}
        {error&&<Alert variant="danger">{error}</Alert>}
        <Row>
            
            {products.map(product=>

            <Col key={product._id} sm={12} md={6} lg={4} l={2}>
                <Products  products={product}/>
            </Col>
                )}
            
            
        </Row>
          
        </>
    )
}

export default HomeScreen
