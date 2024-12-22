import React from 'react'
import './MobileApp.css'
import { assets } from '../../assets/assets'

const MobileApp = () => {
  return (
    <div className='Mobile-download' id='Mobile-download'>
        <p>For Your Better Experience You Can Download Our App <br /><span>MealMate App</span></p>
        <div className="Mobile-app-download-platforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
      
    </div>
  )
}

export default MobileApp
