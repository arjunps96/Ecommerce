import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button, Col, FormCheck } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { cartSavePayment } from "../actions/userActions";

import ProgressBarScreen from "./ProgressBarScreen";

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    history.pushState("/shipping");
  }
  const [paymentMethod, setpaymentMethod] = useState("PayPal");
  const PaymentsubmitHandler = (e) => {
    e.preventDefault();
    dispatch(cartSavePayment(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <>
      <FormContainer>
        <ProgressBarScreen step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={(e) => PaymentsubmitHandler(e)}>
          <Form.Group>
            <FormCheck.Label as="legend">Select Method</FormCheck.Label>

            <Col>
              <Form.Check
                type="radio"
                name="paymentMethod"
                value="PayPal"
                label="PayPal or creditCard"
                id="paypal"
                onChange={(e) => setpaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type="radio"
                name="paymentMethod"
                value="stripe"
                label="stripe"
                id="stripe"
                onChange={(e) => setpaymentMethod(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Button variant="primary" type="submit" className="my-2">
            Order Now
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
