import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { userRegister } from "../actions/userActions";

const RegisterScreen = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { userInfo, isLoading, error } = useSelector(
    (state) => state.userRegister
  );

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password and confirm password should be same");
    } else {
      setMessage("");
      dispatch(userRegister(name, email, password));
    }
  };
  const redirect = location.search ? location.search.split("=")[1] : "/";
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {isLoading && <Loader />}
      {message && <Message variant={"danger"}>{message}</Message>}
      {error && <Message variant={"danger"}>{error}</Message>}
      <Form onSubmit={formSubmitHandler}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter user email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="my-2">
          Submit
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          <span>
            Already register?
            <Link to={redirect ? `/sign-in?redirect=${redirect}` : "/sign-in"}>
              Click here to login
            </Link>
          </span>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
