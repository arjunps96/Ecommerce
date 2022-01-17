import React, { useEffect } from "react";

import { Table, Button } from "react-bootstrap";

import Loader from "../components/Loader";

import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../components/Alert";

import { getAllOrders } from "../actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";
const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderAll);
  const user = useSelector((state) => state.user);
  const { isloading, orders, error } = orderList;

  useEffect(() => {
    if (user.userInfo && user.userInfo.isAdmin) {
      dispatch(getAllOrders());
    } else {
      history.push("/sign-in");
    }
  }, [dispatch, user, history]);

  return (
    <>
      <h2>ORDERS</h2>
      {isloading ? (
        <Loader />
      ) : error ? (
        <AlertMessage variant="danger">{error}</AlertMessage>
      ) : (
        orders && (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <td>User Name</td>
                <td>PRICE</td>
                <td>NUMBER OF ITEMS</td>
                <td>DATE</td>
                <td>PAID</td>
                <td>DELIEVRED</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.orderItems.length}</td>
                  <td>{order.updatedAt.substring(0, 10)}</td>
                  <td>
                    {order.isPaid ? (
                      <i
                        className="fas fa-check-circle"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i
                        className="fas fa-times-circle"
                        style={{ color: "red" }}
                      ></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <i
                        className="fas fa-check-circle"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i
                        className="fas fa-times-circle"
                        style={{ color: "red" }}
                      ></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/orders/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )
      )}
    </>
  );
};

export default OrderListScreen;
