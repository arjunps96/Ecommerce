import React, { useState, useEffect } from "react";

import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Alert";
import { useDispatch, useSelector } from "react-redux";

import { userDetails, userUpdateProfile } from "../actions/userActions";

import { getMyOrders } from "../actions/orderActions";
import AlertMessage from "../components/Alert";

const ProfileScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { user, isLoading, error } = useSelector((state) => state.userDetails);
  const { success } = useSelector((state) => state.userUpdateProfile);
  const {
    isLoading: loadingOrders,
    orders,
    error: errorOrders,
  } = useSelector((state) => state.orderMyList);

  useEffect(() => {
    if (!userInfo) {
      history.push("/sign-in");
    } else {
      if (!user.name) {
        dispatch(userDetails("profile"));
        dispatch(getMyOrders());
      } else {
        setEmail(user.email);
        setName(user.name);
      }
    }
  }, [dispatch, user, email, name, history, userInfo]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password and confirm password should be same");
    } else {
      dispatch(userUpdateProfile({ name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>Your Profile</h2>
        {isLoading && <Loader />}
        {message && <Message variant={"danger"}>{message}</Message>}
        {error && <Message variant={"danger"}>{error}</Message>}
        {success && (
          <Message variant={"success"}>Profile updated successfully!</Message>
        )}
        <Form onSubmit={(e) => formSubmitHandler(e)}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter the username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter user email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>
          <Form.Group controlId="confirm password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="my-2">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Your Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <AlertMessage variant="danger">{errorOrders}</AlertMessage>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIEVIRED</th>
                <th>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>

                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className="fas fa-times"></i>
                      )}
                    </td>

                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i className="fas fa-times"></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/orders/${order._id}`}>
                        <Button className="btn btn-light btn-sm">
                          GetDetails
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
