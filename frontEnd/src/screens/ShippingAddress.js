import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { userShippingAddress } from "../actions/userActions";

import ProgressBarScreen from "./ProgressBarScreen";

const ShippingAddress = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(userShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <>
      <ProgressBarScreen step1 step2 />
      <FormContainer>
        <h1>Shipping Address</h1>
        <Form onSubmit={(e) => submitHandler(e)}>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="my-2">
            Proceed to payment
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingAddress;
