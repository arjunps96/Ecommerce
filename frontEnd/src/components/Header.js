import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import { Route } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(userLogout());
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Proshop</Navbar.Brand>
          </LinkContainer>

          <Nav className="ml-auto">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <LinkContainer to="/cart">
              <Nav.Link>
                {" "}
                <i className="fas fa-shopping-cart"></i>
                cart
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name}>
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/sign-in">
                <Nav.Link>
                  <i className="fas fa-user"></i>sign in
                </Nav.Link>
              </LinkContainer>
            )}

            {userInfo && userInfo.isAdmin && (
              <NavDropdown title={"Admin Screen"}>
                <LinkContainer to="/admin/users">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/products">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orders">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
