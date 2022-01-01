import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row, ListGroup, Image, Card } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { getOrderAction } from "../actions/orderActions";
import Loader from "../components/Loader";
import AlertMessage from "../components/Alert";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const order = useSelector((state) => state.orderDetails);

  const { isloading, error } = order;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderAction(orderId));
  }, [orderId, dispatch]);

  return (
    <>
      {isloading ? (
        <Loader />
      ) : error ? (
        <AlertMessage variant="danger">{error}</AlertMessage>
      ) : (
        <>
          <h1>{order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <strong>Name:</strong>
                  {order.orderItems.user.name}
                  <p>
                    <strong>Email:</strong>
                    <a href={`mailto:${order.orderItems.user.email}`}>
                      {order.orderItems.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {order.orderItems.shippingAddress.address},
                    {order.orderItems.shippingAddress.city}{" "}
                    {order.orderItems.shippingAddress.country}{" "}
                  </p>
                  {order.orderItems.isDelivered ? (
                    <AlertMessage variant="success">
                      Order Delivered
                    </AlertMessage>
                  ) : (
                    <AlertMessage variant="danger">Not delivered</AlertMessage>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>

                  <h4>{order.orderItems.paymentMethod}</h4>
                  {order.orderItems.isPaid ? (
                    <AlertMessage variant="success">Paid</AlertMessage>
                  ) : (
                    <AlertMessage variant="danger">Not paid</AlertMessage>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  {order.orderItems.orderItems.length === 0 ? (
                    <AlertMessage>You dont have any orders</AlertMessage>
                  ) : (
                    order.orderItems.orderItems.map((item, index) => (
                      <Row key={index}>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            <p>
                              <strong>{item.name}</strong>
                            </p>
                          </Link>
                        </Col>
                        <Col md={4}>
                          <strong>
                            {item.qty}x{item.price}={item.qty * item.price}
                          </strong>
                        </Col>
                      </Row>
                    ))
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Item Price</Col>
                      <Col>{order.orderItems.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping Price</Col>
                      <Col>{order.orderItems.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>{order.orderItems.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>{order.orderItems.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
