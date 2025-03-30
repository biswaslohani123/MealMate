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
        const response = await axios.post(url + "/api/order/userOrders", {}, { headers: { token } });
        setData(response.data.data);
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    
    const formatDate = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString(); 
    };

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                
                <div className="view-all-btn-container">
                    <button  onClick={() => setShowAll(!showAll)}>
                        {showAll ? "Show Latest Order" : "View All Orders"}
                    </button>
                </div>

                {data.length > 0 && (
                    <>
                        {!showAll ? (
                            <div className="my-orders-order">
                                <img src={assets.parcel_icon} alt="" />
                                <p>{data[0].items.map((item, index) => (
                                    index === data[0].items.length - 1
                                        ? `${item.name} x ${item.quantity}`
                                        : `${item.name} x ${item.quantity}, `
                                ))}</p>
                                <p>Rs.{data[0].amount}</p>
                                <p>Total items: {data[0].items.length}</p>
                                <p><span>&#x25cf;</span> <b>{data[0].status}</b></p>
                                <p>Date: {formatDate(data[0].date)}</p> 
                                <button onClick={fetchOrders}>Track Order</button>
                            </div>
                        ) : (
                            data.map((order, index) => (
                                <div key={index} className="my-orders-order">
                                    <img src={assets.parcel_icon} alt="" />
                                    <p>{order.items.map((item, i) => (
                                        i === order.items.length - 1
                                            ? `${item.name} x ${item.quantity}`
                                            : `${item.name} x ${item.quantity}, `
                                    ))}</p>
                                    <p>Rs.{order.amount}</p>
                                    <p>Total items: {order.items.length}</p>
                                    <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                                    <p>Date: {formatDate(order.date)}</p> 
                                    <button onClick={fetchOrders}>Track Order</button>
                                </div>
                            ))
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
