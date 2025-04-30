import React, { useEffect, useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import OurGallery from '../../components/Gallery/OurGallery'
import Promotional from '../../components/Promotional/Promotional'






const Home = () => {
  const [category, setCategory] = useState("All");
  useEffect(()=>{
    console.log(category)
  },[category])
  return (
    <div>
      <Promotional/>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <OurGallery/>
     
      
      
      
    </div>
  )
}

export default Home
