import React,{useState,useEffect} from 'react';

import Products from '../components/Product';
import { Row,Col } from 'react-bootstrap';
import axios from 'axios';

const HomeScreen = () => {
    const [Product,setProduct]=useState([]);

    useEffect(()=>{
        const getProducts=async()=>{
            const {data}=await axios.get('/api/products')
            setProduct(data);
        }

        getProducts()

        

    },[])

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
