import React from 'react'
import './Orders.css'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from "axios"
import { assets } from '../../../../Frontend/src/assets/assets'

const Orders = ({url}) => {
  const [orders, setOrders] = useState([]);
  
  const fetchAllOrder = async () => {
    const response = await axios.get(url+"/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);      
    } else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
  
    // Finding the current order status
    const currentOrder = orders.find(order => order._id === orderId);
  
    // implenting Logic
    if (currentOrder.status === "Order Delivered" && newStatus !== "Order Delivered") {
      toast.error("You cannot change the status after 'Order Delivered'");
      return;
    }
  
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: newStatus
    });
  
    if (response.data.success) {
      await fetchAllOrder();
    }
  };
  
  
  useEffect(() => {
    fetchAllOrder()
  }, [])


  
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " X " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + ","
                    
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.location+ " , " + order.address.street}</p>
              </div>
              <p className='order-item-phone'>{order.address.Phone}</p>
              
            
            </div>
            <p>TotalItems : {order.items.length}</p>
            <p><span>Rs.</span>{order.amount}</p>
            <p><b style={{color:"tomato"}}>Payment: </b>{order.address.paymentMethod}</p>


        
            

            
            <select onChange={(event) => statusHandler(event,order._id) } value={order.status}>
              <option value="Order Received ">Order Received</option>
              <option value="Order Processing">Order Processing</option>
              <option value="Order Out For Delivery">Order Out For Delivery</option>
              <option value="Order Delivered">Order Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders