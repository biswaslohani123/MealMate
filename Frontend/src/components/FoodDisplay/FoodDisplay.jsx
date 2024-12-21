import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)
  return (
    <div>
      <div className="food-display" id='food-display'>
        <h2>Our Dishes</h2>
      </div>
    </div>
  )
}

export default FoodDisplay
