import { useContext, useState } from "react";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const FoodItem = ({ id, name, price, description, image, active = true }) => {
  const { cartItems, addToCart, removeFromCart, url, decrementCartItem } =
    useContext(StoreContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    addToCart(id);
    toast.success(`${name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleRemoveFromCart = () => {
    decrementCartItem(id);
  };

  return (
    <div
      className={`food-item ${!active ? "food-item-inactive" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="food-item-image-container">
        <img
          className="food-item-image"
          src={url + "/images/" + image || "/placeholder.svg"}
          alt={name}
          loading="lazy"
        />

        <div className="food-item-overlay">
          {!active && (
            <div className="food-item-status-badge">
              <span>Currently Unavailable</span>
            </div>
          )}

          {active && (
            <div className="food-item-actions">
              {!cartItems?.[id] ? (
                <button
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                  aria-label={`Add ${name} to cart`}
                >
                  <svg
                    className="cart-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4.01" />
                  </svg>
                  <span>Add to Cart</span>
                </button>
              ) : (
                <div className="food-item-counter">
                  <button
                    className="counter-btn decrease"
                    onClick={handleRemoveFromCart}
                    aria-label="Decrease quantity"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M5 12h14" />
                    </svg>
                  </button>

                  <span className="counter-value">{cartItems[id]}</span>

                  <button
                    className="counter-btn increase"
                    onClick={handleAddToCart}
                    aria-label="Increase quantity"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {cartItems?.[id] && (
          <div className="cart-badge">
            <svg
              className="cart-badge-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4.01" />
            </svg>
            <span className="cart-badge-count">{cartItems[id]}</span>
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-header">
          <h3 className="food-item-name">{name}</h3>
          <div className="food-item-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="star"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="rating-text">4.5</span>
          </div>
        </div>

        <p className="food-item-description">{description}</p>

        <div className="food-item-footer">
          <div className="food-item-price">
            <span className="currency">Rs.</span>
            <span className="amount">{price}</span>
          </div>

          {active && !cartItems?.[id] && (
            <button
              className="quick-add-btn"
              onClick={handleAddToCart}
              aria-label={`Quick add ${name} to cart`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
