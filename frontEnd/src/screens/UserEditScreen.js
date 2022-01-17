import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { userDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/constants";

const UserEditScreen = ({ history, location, match }) => {
  const userId = match.params.id;
  const [email, setEmail] = useState("");

  const [name, setName] = useState("");
  const [isAdmin, setisAdmin] = useState(false);

  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetails);
  const userUpdate = useSelector((state) => state.userUpdate);
  const { isLoading, error, user } = userDetail;
  const {
    isLoading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = userUpdate;

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/users");
    } else {
      if (!user.name || user.id !== userId) {
        dispatch(userDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setisAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userId, user, updateSuccess, history]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateUser({
        id: userId,
        name,
        email,
        isAdmin,
      })
    );
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/admin/users">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <FormContainer>
          <h1>Edit User</h1>
          {updateLoading && <Loader />}
          {updateError && <Message variant="danger">{updateError}</Message>}
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
              <Form.Check
                type="checkbox"
                label="isAdmin"
                checked={isAdmin}
                onChange={(e) => setisAdmin(e.target.checked)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="my-2">
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default UserEditScreen;
