import React from 'react'
import './DeliveryCharges.css'
import { assets } from '../../assets/assets'

const DeliveryCharges = () => {
  return (
   <div className='delivery' id='Delivery-Charges'>
    <div className='content'>
        <img src={assets.logo} alt="" className='icon' />
    </div>
    <div className="container-text">
        <h2>Delivery Charges</h2>
        <hr />
        <p className='text'>
            MealMate Fresh Orders:
            We Take Delivery Charge of  Rs.100 inside Pokhara valley
        </p>
    </div>
   </div>
  )
}

export default DeliveryCharges
