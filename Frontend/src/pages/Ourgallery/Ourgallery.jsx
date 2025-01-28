import React from 'react'
import './Ourgallery.css'
import { assets } from '../../assets/assets'


const Ourgallery = () => {
  return (
    <div className='gallery-section'>
        
        <div className="content">
           
            <div className="images">
                <img src={assets.img_1} alt="" />
                <img src={assets.img_2} alt="" />
                <img src={assets.img_3} alt="" />
                <img src={assets.img_4} alt="" />
                <img src={assets.img_5} alt="" />
                <img src={assets.img_6} alt="" />
            </div>
        </div>
      
    </div>
  )
}

export default Ourgallery
