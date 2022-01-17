import React,{useEffect,useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Meta from "../components/Meta";
import Rating from "../components/Rating";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  FormControl,
  Form,
} from "react-bootstrap";
import AlertMessage from "../components/Alert";
import Loader from "../components/Loader";

import {
  getproductDetails,
  createProductReview,
} from "../actions/productActions";

import { Link } from "react-router-dom";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/constants";

const ProductScreen = ({ match, history }) => {
  const [Qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const dispatch = useDispatch();
  const Product = useSelector((state) => state.productDetails.product);
  const ProductReview = useSelector((state) => state.productcreateReview);
  const user = useSelector((state) => state.user);

  const { userInfo } = user;

  const {
    loading: productCreateLoading,
    error: productCreateError,
    success: productCreateSuccess,
  } = ProductReview;

  const addtocartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${Qty}`);
  };

  useEffect(() => {
    if (productCreateSuccess) {
      setRating(0);
      setReview("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      dispatch(getproductDetails(match.params.id));
    } else {
      if (!Product._id || Product._id !== match.params.id) {
        dispatch(getproductDetails(match.params.id));
      }
    }
  }, [match.params.id, dispatch, productCreateSuccess, Product._id]);

  const formsubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        comment: review,
        rating,
      })
    );
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      <Meta title={Product.name} />
      <Row>
        <Col md={6}>
          <Image src={Product.image} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{Product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={Product.rating}
                text={`${Product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>{Product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Price: $ <strong>{Product.price}</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                {Product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
              </ListGroup.Item>
              {Product.countInStock && (
                <ListGroup.Item>
                  <Row>
                    <Col className="py-2">Qty</Col>
                    <Col>
                      <FormControl
                        as="select"
                        value={Qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(Product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </FormControl>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  variant="dark"
                  disabled={Product.countInStock === 0}
                  onClick={addtocartHandler}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row className="my-3">
        <h2>Reviews</h2>
        <Col md={6}>
          {Product.Reviews && Product.Reviews.length === 0 ? (
            <AlertMessage variant="info">
              No Reviews find for this product
            </AlertMessage>
          ) : (
            <ListGroup>
              {Product.Reviews &&
                Product.Reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>

                    <Rating value={review.rating} />
                    <p>{review.comment}</p>

                    <p>{review.createdAt.substring(0, 10)}</p>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          )}
        </Col>
      </Row>
      {productCreateSuccess && (
        <AlertMessage variant="success">
          Review Submit Successfully
        </AlertMessage>
      )}
      {productCreateLoading && <Loader />}
      {productCreateError && (
        <AlertMessage variant="danger">{productCreateError}</AlertMessage>
      )}
      <Row md={8}>
        <h2>Write a Review</h2>
        {userInfo ? (
          <Form onSubmit={formsubmitHandler}>
            <Form.Group id="review-rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="">Select a rating</option>
                <option value="1">Poor</option>
                <option value="2">Fair</option>
                <option value="3">Good</option>
                <option value="4">Very Good</option>
                <option value="5">Excellent</option>
              </Form.Control>
            </Form.Group>
            <Form.Group id="review-comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                onChange={(e) => setReview(e.target.value)}
                value={review}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" className="btn btn-dark my-3">
              Submit
            </Button>
          </Form>
        ) : (
          <AlertMessage variant="info">
            Please <Link to="/sign-in">Sign in</Link> to submit a review
          </AlertMessage>
        )}
      </Row>
    </>
  );
};

export default ProductScreen
