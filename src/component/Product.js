import React from "react";
import { Link } from "react-router-dom";
{
  /* <div className="card">
      <Link to={props.product._id}>
        <img className="medium" src={props.product.image} alt={props.name} />
      </Link>
      <div className="card-body">
        <Link to={props.product._id}>
          <p>
            <b>{props.product.name}</b>
          </p>
        </Link>
        <p>Review : {props.product.review}</p>
        <p>Price : {props.product.price}</p>
      </div>
    </div> */
}
export const Product = (props) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img className="large" src={props.product.image} alt={props.name} />
          <p>
            <b>{props.product.name}</b>
            <p style={{ color: "black" }}>Price : ${props.product.price}</p>
          </p>
        </div>
        <div className="flip-card-back">
          <Link to={`product/${props.product._id}`}>
            <img className="small" src={props.product.image} alt={props.name} />
          </Link>
          <Link to={`product/${props.product._id}`}>
            <p>
              <b>{props.product.name}</b>
            </p>
          </Link>
          <p style={{ color: "black" }}>Reviews : {props.product.numReviews}</p>
          <p style={{ color: "black" }}>Price : ${props.product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
