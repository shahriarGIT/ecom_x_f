import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../component/CheckoutSteps";
import { savePaymentMethod } from "../redux/actions/cartActions";

const PaymentMethodpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shipping } = useSelector((state) => state.cart);
  const { payment } = useSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState(payment || "PayPal");

  useEffect(() => {
    if (!shipping.address) {
      navigate("/shipping");
    }
  }, [shipping.address]);

  // console.log(paymentMethod);
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <form onSubmit={submitHandler}>
        <div>
          <h2>Select Payment</h2>
        </div>
        <div>
          <input
            type="radio"
            id="paypal"
            value="PayPal"
            name="paymentMethod"
            checked={paymentMethod === "PayPal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          />
          <label htmlFor="paypal">PayPal</label>
        </div>
        <div>
          <input
            type="radio"
            id="stripe"
            value="Stripe"
            name="paymentMethod"
            checked={paymentMethod === "Stripe"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          />
          <label htmlFor="stripe">Stripe</label>
        </div>
        <button className="primary" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
};

export default PaymentMethodpage;
