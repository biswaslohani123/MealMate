import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { FaCcStripe } from "react-icons/fa6";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, clearCart } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    Note: "",
    Phone: "",
    paymentMethod: ""
  })
 
  const [paymentMethod, setPaymentMethod] = useState('stripe')
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const locations = [
    'Lakeside',
    'Nadipur',
    'Prithvi Chowk',
    'Pardi',
    'Ranipawa',
    'Damside',
    'Chipledhunga',
    'Bagar',
  ]

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  useEffect(() => {
    setData(data => ({ ...data, paymentMethod: paymentMethod }))
  }, [paymentMethod])

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 100,
    }

    setLoading(true); 

    try {
      // calling API
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })
      if (response.data.success) {
        if (response.data.data === 'cod') {
          clearCart()
          toast.success("Your Order has been placed")
          navigate('/myorders')
        } else {
          const { session_url } = response.data;
          window.location.replace(session_url);
        
        
        }
      } else {
        toast.error("Error placing order.");
      }
    } catch (error) {
      toast.error("Error placing order.");
    } finally {
      setLoading(false); 
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/cart')
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [token])

  return (
    <>
      {loading ? (
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Placing your order...</p>
        </div>
      ) : (
        <form onSubmit={placeOrder} className='place-order'>
          <div className="place-order-left">
            <p className='title'>Delivery Information</p>
            <div className='multi-fields'>
              <p>First Name:</p>
              <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' required />
              <p>Last Name:</p>
              <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' required />
            </div>
            <p>Email:</p>
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' required />

            <p>Your location:</p>
            <select name="location" onChange={onChangeHandler} value={data.location} required>
              <option value="">Select your location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>

            <div className='multi-fields'>
              <p>Order Note (any message for us)</p>
              <input name='Note' onChange={onChangeHandler} value={data.Note} type="text" placeholder='Any Message' required />
            </div>
            <p>Phone:</p>
            <input name='Phone' onChange={onChangeHandler} value={data.Phone} type="text" placeholder='Phone' required />
          </div>

          <div className="place-order-right">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>Rs.{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery charge</p>
                  <p>Rs.{100}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>Rs.{getTotalCartAmount() + 100}</b>
                </div>
              </div>
              <h2>Payment Methods:</h2>
              <div className="payment-1">
                <input type="radio" name='paymentMethod' value='stripe' checked={paymentMethod === 'stripe'} onChange={() => setPaymentMethod('stripe')} />
                <FaCcStripe /> Pay With Stripe
              </div>
              
              <div className="payment-2">
                <input type="radio" name='paymentMethod' value='cod' checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                (COD) Cash On Delivery
              </div>
              <button type='submit'>PLACE ORDER</button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}

export default PlaceOrder
