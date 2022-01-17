import React,{useEffect,} from 'react';


import Products from '../components/Product';
import ProductCarousel from "./ProductCarousel";
import { Row, Col, Button } from "react-bootstrap";

import Paginate from "../components/Paginate";

import { getAllproducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Alert from "../components/Alert";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const keyword = match.params.keyword;
  const pageNumber = Number(match.params.pageNumber) || 1;

  const { loading, products, error, page, pages } = productList;

  useEffect(() => {
    dispatch(getAllproducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/">
          <Button className="btn btn-light">Go Back</Button>
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading && <Loader />}
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {products &&
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} l={2}>
              <Products products={product} />
            </Col>
          ))}
      </Row>
      <Paginate page={page} pages={pages} keyword={keyword ? keyword : ""} />
    </>
  );
};

export default HomeScreen
