import React, { useEffect } from "react";

import { Button, Table, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";

import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../components/Alert";

import Paginate from "../components/Paginate";

import {
  getAllproducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/constants";
const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const pageNumber = Number(match.params.pageNumber) || 1;

  const user = useSelector((state) => state.user);
  const productsList = useSelector((state) => state.productList);
  const productDelete = useSelector((state) => state.productDelete);
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: productLoading,
    products,
    error: productError,
    page,
    pages,
  } = productsList;
  const {
    loading: productDeleteLoading,
    success,
    error: productDeleteError,
  } = productDelete;
  const {
    loading: productCreateLoading,
    success: productCreateSuccess,
    error: productCreateError,
    products: productCreateProducts,
  } = productCreate;
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!user.userInfo && user.userInfo.isAdmin) {
      history.push("/sign-in");
    }
    if (productCreateSuccess) {
      history.push(`/admin/product/${productCreateProducts._id}/edit`);
    }
    dispatch(getAllproducts("", pageNumber));
  }, [
    dispatch,
    user,
    history,
    success,
    productCreateSuccess,
    productCreateProducts,
    pageNumber,
  ]);
  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  const createHandler = () => {
    dispatch(createProduct());
  };
  return (
    <>
      {productLoading ? (
        <Loader />
      ) : productError ? (
        <AlertMessage variant="danger">{productError}</AlertMessage>
      ) : (
        <>
          <Row>
            <Col>
              <h2>PRODUCTS</h2>
            </Col>
            <Col>
              <Button className="btn btn-dark my-3" onClick={createHandler}>
                <i className="fas fa-plus-circle"></i> CREATE A PRODUCT
              </Button>
            </Col>
          </Row>

          {productDeleteLoading && <Loader />}
          {productDeleteError && (
            <AlertMessage variant="danger">{productDeleteError}</AlertMessage>
          )}
          {productCreateLoading && <Loader />}
          {productCreateError && (
            <AlertMessage variant="danger">{productCreateError}</AlertMessage>
          )}
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <td>ID</td>
                <td>NAME</td>
                <td>PRICE</td>
                <td>BRAND</td>
                <td>CATEGORY</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
