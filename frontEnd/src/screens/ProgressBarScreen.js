import React from "react";
import { Nav } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

const ProgressBarScreen = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/sign-in">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        ) : (
          <LinkContainer to="/sign-in" disabled>
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <LinkContainer to="/shipping" disabled>
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <LinkContainer to="/payment" disabled>
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/place-order">
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <LinkContainer to="/place-order" disabled>
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default ProgressBarScreen;
