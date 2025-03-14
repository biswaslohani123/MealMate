import React, { useContext, useDeferredValue, useEffect } from "react";
import "./FoodDisplay.css";

import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../../context/StoreContext";

const FoodDisplay = ({category}) => {
  const { food_list } = useContext(StoreContext);
  useEffect(()=>{
    food_list.map((item)=>{
      console.log(item.category)
    })
  },[food_list])
  return (
    <div className="hero">
      <div className="food-display" id="food-display">
        <h2>Our Dishes</h2>
        <div className="food-display-list">
          {food_list.map((item, index) => {
            if (category=== "All" || category.toLowerCase() === item.category.toLowerCase()) {
              
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
          
            
          })}
        </div>
      </div>
      <hr />
    </div>
    
  );
};

export default FoodDisplay;
