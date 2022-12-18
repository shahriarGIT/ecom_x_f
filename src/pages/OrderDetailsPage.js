import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../component/Card";
import { getOrderDetails } from "../redux/actions/orderActions";
import { CART_EMPTY } from "../redux/constants/cartConstants";
import { ORDER_DETAILS_REQUEST } from "../redux/constants/orderConstants";

const OrderDetailsPage = () => {
  const dispatch = useDispatch();
  const { id: orderId } = useParams();
  const { order, loading, error } = useSelector((state) => state.orderDetails);

  // console.log(order, "orders");
  useEffect(() => {
    dispatch({ type: CART_EMPTY });
    dispatch(getOrderDetails(orderId));
  }, [orderId]);
  return (
    <Card>
      <h2>Order Details</h2>
      <p>Order ID : {orderId}</p>
    </Card>
  );
};

export default OrderDetailsPage;
