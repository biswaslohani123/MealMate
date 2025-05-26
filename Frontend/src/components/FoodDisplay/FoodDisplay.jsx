import React, { useContext } from "react";
import "./FoodDisplay.css";
import { useNavigate } from "react-router-dom";

import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../../context/StoreContext";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const navigate = useNavigate();

  const filteredItems = food_list.filter(
    (item) => category === "All" || category.toLowerCase() === item.category.toLowerCase()
  );

  const displayItems = filteredItems.slice(0, 5);

  // Handler when clicking on food image
  const handleImageClick = () => {
    // Navigate to /all-foods with category query param to scroll there
    navigate(`/all-foods?category=${category.toLowerCase()}`);
  };

  return (
    <div className="hero">
      <div className="food-display" id="food-display">
        <h2>Our Dishes</h2>
        <div className="food-display-list">
          {displayItems.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              active={item.active !== false}
              onImageClick={handleImageClick}  // Pass click handler to FoodItem
            />
          ))}
        </div>

        {filteredItems.length > 5 && (
          <div className="see-more-container">
            <button className="see-more-button" onClick={() => navigate("/all-foods")}>
              See More
            </button>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
};

export default FoodDisplay;
