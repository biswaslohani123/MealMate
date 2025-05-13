import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCcStripe } from "react-icons/fa6";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, clearCart } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    Note: "",
    Phone: "",
    paymentMethod: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Fetch user profile to prefill form
  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`${url}/api/user/profile`, {
        headers: { token }
      });

      if (res.data.success) {
        const user = res.data.user;
        const [firstName, ...rest] = user.name?.split(" ") || [];
        const lastName = rest.join(" ");
        setData((prev) => ({
          ...prev,
          firstName: firstName || "",
          lastName: lastName || "",
          email: user.email || "",
          Phone: user.phone || "",
          location: user.address || "",
        }));
      }
    } catch (err) {
      toast.error("Failed to fetch user info");
    }
  };

  useEffect(() => {
    setData((prev) => ({ ...prev, paymentMethod }));
  }, [paymentMethod]);

  useEffect(() => {
    if (!token) {
      toast.warning("Please login to proceed");
      navigate("/");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    } else {
      fetchUserProfile(); // ✅ Fetch on mount
    }
  }, [token]);

  const placeOrder = async (event) => {
    event.preventDefault();
    const orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] });
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 100,
      paymentMethod
    };

    setLoading(true);

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        if (response.data.data === "cod") {
          clearCart();
          toast.success("Your Order has been placed");
          navigate("/myorders");
        } else {
          window.location.replace(response.data.session_url);
        }
      } else {
        toast.error("Error placing order.");
      }
    } catch (error) {
      toast.error("Error placing order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Placing your order...</p>
        </div>
      ) : (
        <form onSubmit={placeOrder} className="place-order">
          <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">
              <p>First Name:</p>
              <input
                name="firstName"
                onChange={onChangeHandler}
                value={data.firstName}
                type="text"
                placeholder="First Name"
                required
              />
              <p>Last Name:</p>
              <input
                name="lastName"
                onChange={onChangeHandler}
                value={data.lastName}
                type="text"
                placeholder="Last Name"
                required
              />
            </div>

            <p>Email:</p>
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Email Address"
              required
            />

            <p>Your location:</p>
            <input
              name="location"
              onChange={onChangeHandler}
              value={data.location}
              type="text"
              placeholder="Enter your location"
              required
            />

            <div className="multi-fields">
              <p>Order Note (any message for us)</p>
              <input
                name="Note"
                onChange={onChangeHandler}
                value={data.Note}
                type="text"
                placeholder="Any Message"
                required
              />
            </div>

            <p>Phone:</p>
            <input
              name="Phone"
              onChange={onChangeHandler}
              value={data.Phone}
              type="text"
              placeholder="Phone"
              required
            />
          </div>

          <div className="place-order-right">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>Rs.{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery charge</p>
                <p>Rs.100</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>Rs.{getTotalCartAmount() + 100}</b>
              </div>

              <h2>Payment Methods:</h2>
              <div className="payment-1">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={() => setPaymentMethod("stripe")}
                />
                <FaCcStripe /> Pay With Stripe
              </div>

              <div className="payment-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                (COD) Cash On Delivery
              </div>

              <button type="submit">PLACE ORDER</button>
              <b className="bold">
                <span className="note">Note:</span> You will not be able to cancel your order once it is placed.
              </b>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default PlaceOrder;
