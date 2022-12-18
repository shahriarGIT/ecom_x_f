import React from "react";
import { useSelector } from "react-redux";

export const Footer = () => {
  const productList = useSelector((state) => state.productList);

  const { loading } = productList;

  return !loading && <footer>Copyright 2023 | Shahriar.js</footer>;
};

export default Footer;
