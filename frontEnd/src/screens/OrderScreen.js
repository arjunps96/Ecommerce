import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, ListGroup, Image, Card, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import {
  getOrderAction,
  updateOrderPayAction,
  updateOrderDeliverAction,
} from "../actions/orderActions";
import Loader from "../components/Loader";
import AlertMessage from "../components/Alert";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../constants/constants";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);
  const order = useSelector((state) => state.orderDetails);
  const orderPay = useSelector((state) => state.orderPay);
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { userInfo } = useSelector((state) => state.user);

  const { isloading, error } = order;
  const { isloading: loadingPay, success: successPay } = orderPay;
  const {
    isloading: deliverLoading,
    success: deliverSuccess,
    error: deliverError,
  } = orderDeliver;

  const dispatch = useDispatch();
  const paymentSuccessHandler = (PaymentRequest) => {
    dispatch(updateOrderPayAction(orderId, PaymentRequest));
  };
  const orderDeliverHandler = () => {
    dispatch(updateOrderDeliverAction(order.orderItems));
  };
  useEffect(() => {
    if (!userInfo) {
      history.push("/sign-in");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/paypal/clientId");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (order.orderItems.length === 0 || successPay || deliverSuccess) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderAction(orderId));
    } else if (!order.orderItems.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    orderId,
    dispatch,
    order.orderItems,
    successPay,
    deliverSuccess,
    userInfo,
    history,
  ]);

  return (
    <>
      {isloading ? (
        <Loader />
      ) : error ? (
        <AlertMessage variant="danger">{error}</AlertMessage>
      ) : (
        <>
          <Row>
            <Col md={8}>
              <h1>ORDER:{order.orderItems._id}</h1>
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
                  {(deliverLoading || loadingPay) && <Loader />}
                  {deliverError && (
                    <AlertMessage variant="danger">{deliverError}</AlertMessage>
                  )}
                  <ListGroup.Item>
                    {userInfo &&
                    userInfo.isAdmin &&
                    order.orderItems.isPaid &&
                    sdkReady &&
                    !order.orderItems.isDelivered ? (
                      <Button
                        type="button"
                        variant="dark"
                        onClick={orderDeliverHandler}
                      >
                        Mark as Delivered
                      </Button>
                    ) : (
                      <PayPalButton
                        amount={order.orderItems.totalPrice}
                        onSuccess={paymentSuccessHandler}
                      />
                    )}
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
