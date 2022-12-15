import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Card from "../component/Card.js";
import Message from "../component/Message.js";

import { addToCart, removeItemFromCart } from "../redux/actions/cartActions.js";
import { frontEnd_API } from "../utils/utls.js";

export const CartItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;

  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  // console.log(cart.cartItems);
  const { search } = useLocation();
  const qty = new URLSearchParams(search).get("qty");
  const quantity = qty ? Number(qty) : 1;

  let subtotal = 0;

  const checoutHandler = () => {
    navigate("/shipping");
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  const removeFromCartHandler = (productId) => {
    dispatch(removeItemFromCart(productId));
  };
  return (
    <div className="row-flex top">
      <div className="col-3">
        <ul>
          {error ? <Message>{error}</Message> : null}
          {cart.cartItems.length === 0 ? (
            <Message>
              Cart is Empty. <Link to="/">Homepage</Link>
            </Message>
          ) : (
            <ul className="cart">
              {cart.cartItems.map((x) => (
                <li key={x.productId} className="row-flex cart-item">
                  <div>
                    <img
                      className="vsmall"
                      src={`${x.imageURL}`}
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
          )}
        </ul>
      </div>
      <div className="col-1">
        <Card>
          <h2>Sub Total</h2>
          <ul>
            {cart.cartItems.map((x) => (
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
          <p> Sub Total :{subtotal}</p>
          <button onClick={checoutHandler} className="primary block">
            Chechout
          </button>
        </Card>
      </div>
    </div>
  );
};

export default CartItems;
