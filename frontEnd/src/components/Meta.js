import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ keyword, description, title }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keyword} />
    </Helmet>
  );
};
Meta.defaultProps = {
  title: "Welcome to  Proshop",
  description: "A cool website for electronics gadgets, fashions",
  keyword: "electonics,cheap electronics",
};

export default Meta;
