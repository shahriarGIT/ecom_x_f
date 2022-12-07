import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../component/CheckoutSteps.js";

import { saveShippingAddress } from "../redux/actions/cartActions.js";
import CartItems from "./CartItems.js";

const ShippingAddressPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.signIn);
  const { shipping } = useSelector((state) => state.cart);
  const { cartItems } = useSelector((state) => state.cart);

  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
    if (!userInfo) {
      navigate("/signin");
    } else {
      setFullName(shipping.fullName);
      setAddress(shipping.contact);
      setContact(shipping.city);
      setCity(shipping.address);
      setPostCode(shipping.postCode);
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingAddress({
        fullName,
        contact,
        address,
        city,
        postCode,
      })
    );

    navigate("/payment");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 />

      <form onSubmit={submitHandler}>
        <h2>Shipping Address</h2>

        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="postCode">Post Code</label>
          <input
            type="text"
            id="postCode"
            value={postCode}
            onChange={(e) => setPostCode(e.target.value)}
            required
          />
        </div>
        <div>
          <button className="primary" type="submit">
            Proceed
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddressPage;
