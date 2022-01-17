import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <>
      <Form
        onSubmit={formSubmitHandler}
        className="d-flex justify-content-between"
      >
        <Form.Control
          type="text"
          name="q"
          placeholder="Enter the search term...."
          onChange={(e) => setKeyword(e.target.value)}
          className="mr-sm-2 ml-sm-5"
        />

        <Button type="submit" className="btn btn-outline-success p-2">
          Search
        </Button>
      </Form>
    </>
  );
};

export default SearchBox;
