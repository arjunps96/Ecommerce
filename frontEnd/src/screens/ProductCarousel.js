import React, { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";

import { getTopproducts } from "../actions/productActions";
import AlertMessage from "../components/Alert";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const productTop = useSelector((state) => state.productTop);
  const { loading, products, error } = productTop;
  useEffect(() => {
    dispatch(getTopproducts());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <AlertMessage variant="danger">{error}</AlertMessage>
      ) : (
        <>
          <h1>Top Products</h1>
          <Carousel pause="hover" className="bg-dark my-2">
            {products.map((product) => (
              <Carousel.Item key={product._id}>
                <Link to={`/products/${product._id}`}>
                  <Image src={product.image} alt={product.name} fluid />

                  <Carousel.Caption>
                    <h2>
                      {product.name}( ${product.price})
                    </h2>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      )}
    </>
  );
};

export default ProductCarousel;
