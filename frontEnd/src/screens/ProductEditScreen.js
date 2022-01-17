import React, { useState, useEffect } from "react";
import axios from "axios";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getproductDetails, editProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/constants";
import AlertMessage from "../components/Alert";

const ProductEditScreen = ({ history, match }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetails);
  const productUpdate = useSelector((state) => state.productEdit);

  const { loading, error, product } = productDetail;
  const {
    loading: updateLoading,
    error: updateError,

    success: updateSuccess,
  } = productUpdate;

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/products");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(getproductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, productId, product, history, updateSuccess]);

  const UpdateformSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      editProduct({
        id: productId,
        name,
        image,
        brand,
        category,
        countInStock,
        description,
        price,
      })
    );
  };
  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/uploads", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(true);
    }
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/admin/products">
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <FormContainer>
          <h1>Edit Product</h1>

          {updateLoading && <Loader />}
          {updateError && (
            <AlertMessage variant="danger">{updateError}</AlertMessage>
          )}
          <Form onSubmit={UpdateformSubmitHandler}>
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
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.Control
                type="file"
                id="image-file"
                label="Choose file"
                onChange={uploadHandler}
              />
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="my-3">
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default ProductEditScreen;
