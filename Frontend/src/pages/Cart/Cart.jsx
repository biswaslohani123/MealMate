import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Trash2 } from 'lucide-react';

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url,
    addToCart, 
    decrementCartItem,
    incrementCartItem
  } = useContext(StoreContext);

  // navigation for place Order Page
  const navigate = useNavigate();
  
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Item name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>Rs.{item.price}</p>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn" 
                      onClick={() => {
                        decrementCartItem(item._id);
                       
                      }}
                    >
                      -
                    </button>
                    <p>{cartItems[item._id]}</p>
                    <button 
                      className="quantity-btn" 
                      onClick={() => {
                        
                        incrementCartItem(item._id)
                      
                      }}
                    >
                      +
                    </button>
                  </div>
                  <p>Rs.{item.price * cartItems[item._id]}</p>
                  <p
                    onClick={() => {
                      removeFromCart(item._id);
                      toast.info("Item Removed from Cart");
                    }}
                    className="cross"
                  >
                      <Trash2 />
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>Rs.{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery charge</p>
            <p>Rs.{getTotalCartAmount() > 0 ? 100 : 0}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>
              Rs.{getTotalCartAmount() > 0 ? getTotalCartAmount() + 100 : 0}
            </b>
          </div>

          <button
            onClick={() => {
              navigate("/order");
            }}
          >
            Proceed to Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;