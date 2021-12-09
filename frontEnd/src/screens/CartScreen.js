import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  FormControl,
  Image,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../components/Alert";
import { getCartItems, removeCartItems } from "../actions/cartAction";

const CartScreen = ({ match, history, location }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    if (productId) {
      dispatch(getCartItems(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeCartItems(id));
  };

  return (
    <Row>
      <h1>The shopping Cart</h1>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <AlertMessage>No items in you cart</AlertMessage>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  <Col md={2}>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={3}>
                    <h2>$ {item.price}</h2>
                  </Col>
                  <Col md={2}>
                    <FormControl
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(getCartItems(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.InStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </FormControl>
                  </Col>
                  <Col md={2}>
                    <Button
                      className="btn-light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>
              SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              Items
            </h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>
              ${" "}
              {cartItems
                .reduce((acc, item) => item.qty * item.price + acc, 0)
                .toFixed(2)}
            </h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              className="btn-block"
              onClick={() => history.push("/login?checkout")}
            >
              Proceed to payment
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default CartScreen;
