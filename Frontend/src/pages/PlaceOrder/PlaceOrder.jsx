import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const {getTotalCartAmount, token,food_list,cartItems,url} = useContext(StoreContext)

  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    location:"",
    Note:"",
    Phone:"",
    paymentMethod:""
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  
  const placeOrder = async (event) =>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address: data,
      items:orderItems,
      amount:getTotalCartAmount()+100,
     
    }
    // calling API
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
    
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/cart')
    }else if(getTotalCartAmount() === 0)
      {
        navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <p>First Name:</p>
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='first Name' required/>
          <p>Last Name:</p>
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' required/>
        </div>
        <p>Email:</p>
        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' required />
        <p>Your location:</p>
        <input name='location' onChange={onChangeHandler} value={data.location} type="text" placeholder='eg: Enter Your City' required />
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='eg: Enter Your Street.No' required />
        
        
        <div className='multi-fields'>
          <p>Order Note(any message for us)</p>
            <input name='Note' onChange={onChangeHandler} value={data.Note} type="text" placeholder='Any Message' required/>
        </div>
        <p>Phone:</p>
      <input name='Phone' onChange={onChangeHandler} value={data.Phone} type="text" placeholder='phone' required />
      <p>Payment Method:</p>
        <select name="paymentMethod" onChange={onChangeHandler} value={data.paymentMethod} required>
          <option value="">Select Payment Method</option>
          <option value="Cash on Delivery">Cash on Delivery (COD)</option>
          <option value="Stripe">Pay with Stripe</option>
        </select>
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
              <b>Rs.{getTotalCartAmount()+100}</b>
            </div>
          </div>
            <button type='submit'>PLACE ORDER</button>
        </div>

      </div>
    </form>
  )
}

export default PlaceOrder


// khalti password
// BISWAS123##lohani