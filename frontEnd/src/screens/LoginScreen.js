import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { userLogin } from "../actions/userActions";

const LoginScreen = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { userInfo, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(email, password));
  };
  const redirect = location.search ? location.search.split("=")[1] : "/";
  return (
    <FormContainer>
      {isLoading && <Loader />}
      {error && <Message variant={"danger"}>{error}</Message>}
      <Form onSubmit={formSubmitHandler}>
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter user email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="my-2">
          Submit
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          <span>
            New customer?
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Click here to register
            </Link>
          </span>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
