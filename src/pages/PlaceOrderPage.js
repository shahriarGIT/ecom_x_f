import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "../component/Card";
import { Link } from "react-router-dom";
import CheckoutSteps from "../component/CheckoutSteps";
import { frontEnd_API } from "../utils/utls.js";

import { addToCart, removeItemFromCart } from "../redux/actions/cartActions.js";

import { createOrder } from "../redux/actions/orderActions.js";
import { ORDER_CREATE_RESET } from "../redux/constants/orderConstants";
import { CART_EMPTY } from "../redux/constants/cartConstants";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { payment } = useSelector((state) => state.cart);
  const { shipping } = useSelector((state) => state.cart);
  const { cartItems } = useSelector((state) => state.cart);
  const { loading, success, error, order } = useSelector(
    (state) => state.createdOrder
  );

  let subtotal = 0;
  useEffect(() => {
    if (!payment) {
      navigate("/payment");
    }
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
    if (!success && cartItems.length === 0) {
      navigate("/");
    }
  }, [payment, order, cartItems]);

  const removeFromCartHandler = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  const orderSubmitHandler = () => {
    dispatch(
      createOrder({
        shippingAddress: shipping,
        paymentMethod: payment,
        orderItems: cartItems,
        totalPrice: subtotal,
      })
    );
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1>Place Order</h1>
      <div className="row-flex top">
        <div className="col-2">
          <Card>
            <h2> Shipping Address </h2>
            <p> Name : {shipping.fullName}</p>
            <p>
              {" "}
              Address : {shipping.address} ,{shipping.city}
            </p>
            <Link to="/shipping">Edit </Link>
          </Card>
          <Card>
            <h2> Payment Method </h2>
            <p> Selected Method : {payment}</p>

            <Link to="/payment">Edit </Link>
          </Card>
          <Card>
            <h2>Cart Items</h2>
            <ul className="cart">
              {cartItems.map((x) => (
                <li key={x.productId} className="row-flex cart-item">
                  <div>
                    <img
                      className="vsmall"
                      src={`${frontEnd_API + x.image}`}
                      alt={x.description}
                    />
                    {console.log(x)}
                  </div>
                  <div>
                    <p>{x.name}</p>
                  </div>

                  <div>
                    <p>
                      Quantity -{" "}
                      {
                        <select
                          value={x.quantity}
                          onChange={(e) =>
                            dispatch(
                              addToCart(x.productId, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(x.countInStock).keys()].map((index) => (
                            <option key={index + 1} value={index + 1}>
                              {index + 1}
                            </option>
                          ))}
                        </select>
                      }
                    </p>
                  </div>

                  <div>
                    <p>Price - {x.price}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => removeFromCartHandler(x.productId)}
                      className="primary"
                    >
                      Remove Item
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <div className="col-1">
          <Card>
            <h2> Orders</h2>
            <ul>
              {cartItems.map((x) => (
                <li>
                  <p>
                    {x.name} = {x.quantity} x {x.price} = {x.quantity * x.price}
                  </p>
                </li>
              ))}
            </ul>
            <p>
              {cartItems.forEach(
                (item) => (subtotal = subtotal + item.price * item.quantity)
              )}
            </p>
            <h3> Sub Total :{subtotal}</h3>
            <button className="primary block" onClick={orderSubmitHandler}>
              Order
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
