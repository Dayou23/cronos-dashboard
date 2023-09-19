import { Link, useLocation } from "react-router-dom";
import "./order.css";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { updateOrder } from "../../redux/apiCalls";
import Swal from "sweetalert2";

export default function Order() {
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const [delivered, setDelivered] = useState(false);
  const dispatch = useDispatch();

  const order = useSelector((state) =>
    state?.order?.orders?.find((order) => order._id === orderId)
  );

  const products = useSelector((state) => state?.product?.products);

  const user = useSelector((state) =>
    state?.getuser?.users?.find((user) => user._id === order.userId)
  );

  const handleClick = (e) => {
    e.preventDefault();
    updateOrder(orderId, { delivery: delivered }, dispatch);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Update completed successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="order">
      <div className="orderTitleContainer">
        <h1 className="orderTitle">order</h1>
        <Link to="/neworder">
          <button className="orderAddButton">Create</button>
        </Link>
      </div>
      <div className="orderTop">
        <div className="orderTopRight">
          <div className="orderInfoBottom">
            <div>
              <span>
                <b>order id:</b> {order._id}
              </span>
            </div>

            <div>
              <span>
                <b>amount:</b> {order.amount}
              </span>
            </div>
            <div>
              <span>
                <b>city: </b>
                {order.address.city}
              </span>
            </div>
            <div>
              <span>
                <b>country: </b>
                {order.address.country}
              </span>
            </div>
            <div>
              <span>
                <b>line1: </b>
                {order.address.line1}
              </span>
            </div>
            {order.address.line2 && (
              <div>
                <span>
                  <b>line2: </b>
                  {order.address.line2}
                </span>
              </div>
            )}
            <div>
              <span>
                <b>postal code: </b>
                {order.address.postal_code}
              </span>
            </div>
          </div>
        </div>

        <div className="orderTopRight">
          <div className="orderTitleContainer">
            <h1 className="orderTitle">user information</h1>
          </div>
          <div className="orderInfoBottom">
            <div>
              <span>
                <b>user_Id: </b> {order?.userId}
              </span>
            </div>
            <div>
              <span>
                {" "}
                <b>name: </b> {user?.username}
              </span>
            </div>
            <div>
              <span>
                {" "}
                <b>email: </b>
                {user?.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="orderTopRight" style={{ marginBottom: "0px" }}>
        {order.products.map((item) => (
          <div item={item} key={item._id} className="orderTopRightImg">
            {products.map((item2) => (
              <span key={item2._id}>
                {item2._id === item.productId && (
                  <img className="productImg" src={item2.imgs[0].img} />
                )}
              </span>
            ))}
            <div className="Details">
              <span>
                <b>Product_Id: </b> {item.productId}
              </span>

              <span>
                {" "}
                <b>Quantity: </b>
                {item.quantity}
              </span>
            </div>
          </div>
        ))}
      </div>

      <form className="orderBottom">
        <div className="orderForm">
          <div className="orderFormLeft">
            <label>Has the order been delivered?</label>

            <select
              name="delivered"
              id="delivered"
              onChange={(e) => {
                if (e.target.value === "true") {
                  setDelivered(true);
                } else {
                  setDelivered(false);
                }
              }}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div className="orderFormRight">
            <button className="orderButton" onClick={handleClick}>
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
