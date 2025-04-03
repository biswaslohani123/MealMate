import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image, active = true }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className={`food-item ${!active ? "food-item-inactive" : ""}`}>
      <div className="food-item-image-container">
        <img
          className="food-item-image"
          src={url + "/images/" + image}
          alt=""
        />
        
        { /* message for inactive items */}
        {!active && (
          <div className="food-item-status-badge">
            Item Unavailable currently
          </div>
        )}

        {active ? (
          !cartItems?.[id] ? (
            <img
              className="add"
              onClick={() => {
                addToCart(id);
              }}
              src={assets.add_icon_white}
              alt=""
            />
          ) : (
            <div className="food-item-counter">
              <img
                onClick={() => removeFromCart(id)}
                src={assets.remove_icon_red}
                alt=""
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={() => {
                  addToCart(id);
                }}
                src={assets.add_icon_green}
                alt=""
              />
            </div>
          )
        ) : (
          
          <></>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">Rs.{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;