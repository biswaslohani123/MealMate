import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [showAll, setShowAll] = useState(false);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userOrders", {}, { headers: { token } });
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    const DateFormat = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString(); 
    };

   
    const latestOrders = data.filter(order => order.status !== "Order Delivered");
    const previousOrders = data.filter(order => order.status === "Order Delivered");

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                
                <div className="view-all-btn-container">
                    <button onClick={() => setShowAll(!showAll)}>
                        {showAll ? "Show Latest Order" : "View All Orders"}
                    </button>
                </div>

                {data.length > 0 ? (
                    !showAll ? (
                        // Showing  only  latest order
                        latestOrders.length > 0 ? (
                            <div className="my-orders-order">
                                <img src={assets.parcel_icon} alt="Parcel Icon" />
                                <p>{latestOrders[0].items.map((item, index) => (
                                    index === latestOrders[0].items.length - 1
                                        ? `${item.name} x ${item.quantity}`
                                        : `${item.name} x ${item.quantity}, `
                                ))}</p>
                                <p>Rs.{latestOrders[0].amount}</p>
                                <p>Total items: {latestOrders[0].items.length}</p>
                                <p><span>&#x25cf;</span> <b>{latestOrders[0].status}</b></p>
                                <p>Date: {DateFormat(latestOrders[0].date)}</p> 
                                <button onClick={fetchOrders}>Track Order</button>
                            </div>
                        ) : (
                            <p>No Recent orders available.</p>
                        )
                    ) : (
                        // Showing all orders of Latest and Previous
                        <>
                            <h3>Latest Orders</h3>
                            {latestOrders.length > 0 ? (
                                latestOrders.map((order, index) => (
                                    <div key={index} className="my-orders-order">
                                        <img src={assets.parcel_icon} alt="Parcel Icon" />
                                        <p>{order.items.map((item, i) => (
                                            i === order.items.length - 1
                                                ? `${item.name} x ${item.quantity}`
                                                : `${item.name} x ${item.quantity}, `
                                        ))}</p>
                                        <p>Rs.{order.amount}</p>
                                        <p>Total items: {order.items.length}</p>
                                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                                        <p>Date: {DateFormat(order.date)}</p> 
                                        <button onClick={fetchOrders}>Track Order</button>
                                    </div>
                                ))
                            ) : (
                                <p>No  orders .</p>
                            )}

                            <h3>Previous  Orders</h3>
                            {previousOrders.length > 0 ? (
                                previousOrders.map((order, index) => (
                                    <div key={index} className="my-orders-order">
                                        <img src={assets.parcel_icon} alt="Parcel Icon" />
                                        <p>{order.items.map((item, i) => (
                                            i === order.items.length - 1
                                                ? `${item.name} x ${item.quantity}`
                                                : `${item.name} x ${item.quantity}, `
                                        ))}</p>
                                        <p>Rs.{order.amount}</p>
                                        <p>Total items: {order.items.length}</p>
                                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                                        <p>Date: {DateFormat(order.date)}</p> 
                                    </div>
                                ))
                            ) : (
                                <p>No previous orders available.</p>
                            )}
                        </>
                    )
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
