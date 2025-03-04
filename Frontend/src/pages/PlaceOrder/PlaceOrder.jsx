import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    street: "",
    note: "",
    phone: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("stripe"); // Default to Stripe

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 100,
      paymentMethod,
    };


    // Stripe Payment API Call
    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order!");
      }
    } catch (error) {
      console.error("Order Placement Error:", error);
      alert("Something went wrong!");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information:</p>
        <div className='multi-fields'>
          <p>First Name:</p>
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' required />
          <p>Last Name:</p>
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' required />
        </div>
        <p>Email:</p>
        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' required />
        <p>City:</p>
        <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='Enter Your City' required />
        <p>Street:</p>
        <input name='street' onChange={onChangeHandler} value={data.street} type="number" placeholder='Enter Your Street No' required />
        <p>Order Note (Any message for us):</p>
        <input name='note' onChange={onChangeHandler} value={data.note} type="text" placeholder='Any Message' />
        <p>Phone:</p>
        <input name='phone' onChange={onChangeHandler} value={data.phone} type="phone" placeholder='Phone' required />

        
        
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals:</h2>
          <div>
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
          </div>
          

          <div className="payment-methods">
           
            <h2>Payment Method:</h2>
            <div className="payment-fields">
            <input type="radio" name='paymentMethod' value='stripe' checked={paymentMethod === 'stripe'} onChange={() => setPaymentMethod('stripe')} />
            Pay With Stripe
            </div>
            <br />
        
            <div className='payment-fields-2'>
            <input type="radio" name='paymentMethod' value='cod' checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
             COD(Cash on delivery)
           
            </div>
            <button type='submit'>Proceed To Payment</button>
    
             
           
            
            
          </div>
        </div>
      </div>
      
    </form>
    
  );
};

export default PlaceOrder;



// khalti password
// BISWAS123##lohani
