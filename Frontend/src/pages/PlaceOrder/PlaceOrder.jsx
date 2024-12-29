import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {
  const {getTotalCartAmount} = useContext(StoreContext)

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Infromation</p>
        <div className='multi-fields'>
          <p>First Name:</p>
          <input type="text" placeholder='first Name' />
          <p>Last Name:</p>
          <input type="text" placeholder='Last Name'/>
        </div>
        <p>Email:</p>
        <input type="email" placeholder='Email Address' />
        <p>Your location:</p>
        <input type="text" placeholder='eg: Ranipawa' />
        <div className='multi-fields'>
          <p>Order Note(any message for us)</p>
            <input type="text" placeholder='Any Message'/>
        </div>
        <p>Phone:</p>
      <input type="text" placeholder='phone' />
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
            <button>Proceed To Payment</button>
        </div>

      </div>
    </form>
  )
}

export default PlaceOrder
