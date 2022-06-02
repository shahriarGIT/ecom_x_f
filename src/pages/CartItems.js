import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import Card from "../component/Card.js";

import { addToCart, removeItemFromCart } from "../redux/actions/cartActions.js";
import Message from "../utils/Message.js";

export const CartItems = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id: productId } = params;

  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  console.log(cart.cartItems);
  const { search } = useLocation();
  const qty = new URLSearchParams(search).get("qty");
  const quantity = qty ? Number(qty) : 1;

  useEffect(() => {
    dispatch(addToCart(productId, quantity));
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
                    <img className="vsmall" src={x.image} alt={x.description} />
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
          <p>Sub Total</p>
        </Card>
      </div>
    </div>
  );
};

export default CartItems;
