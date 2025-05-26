import React, { useContext } from "react";


import "./AllProducts.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../../components/FoodItem/FoodItem";

const AllFoodsPage = () => {

  const { food_list } = useContext(StoreContext)

  return (
    <div className="all-foods-page">
      <h2>All Dishes</h2>
      <div className="food-display-list">
        {food_list.map((item) => (
          <FoodItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
            active={item.active !== false}
          />
        ))}
      </div>
    </div>
  );
};

export default AllFoodsPage;
