import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row, ListGroup, Image, Card, Button } from "react-bootstrap";
import Message from "../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import ProgressBarScreen from "./ProgressBarScreen";
import { createOrderAction } from "../actions/orderActions";
import Loader from "../components/Loader";
import AlertMessage from "../components/Alert";

const PlaceOrder = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { success, isloading, order, error } = useSelector(
    (state) => state.orderItems
  );
  const dispatch = useDispatch();
  const { shippingAddress } = cart;
  const addDecimal = (price) => {
    return (Math.round(price * 100) / 100).toFixed(2);
  };

  const itemPrice = addDecimal(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const ShippingPrice = itemPrice > 100 ? 100 : 0;
  const taxPrice = addDecimal(itemPrice * 0.35);

  const totalPrice = addDecimal(
    Number(itemPrice) + Number(ShippingPrice) + Number(taxPrice)
  );
  const onSubmitHandler = () => {
    dispatch(
      createOrderAction({
        orderItems: cart.cartItems,
        paymentMethod: cart.paymentMethod,
        shippingAddress: cart.shippingAddress,
        itemsPrice: itemPrice,
        shippingPrice: ShippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };
  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  return (
    <>
      {isloading && <Loader />}
      <ProgressBarScreen step1 step2 step3 step4 />
      {error && <AlertMessage variant="danger">{error}</AlertMessage>}
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress.address},{shippingAddress.city}{" "}
                {shippingAddress.country}{" "}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>

              <h4>{cart.paymentMethod}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                cart.cartItems.map((item, index) => (
                  <Row key={index}>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
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
                  <Col>{itemPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price</Col>
                  <Col>{ShippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>{taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className="btn-block" onClick={onSubmitHandler}>
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
