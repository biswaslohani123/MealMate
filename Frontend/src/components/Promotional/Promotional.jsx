import React, { useState, useEffect } from 'react';
import './Promotional.css'; // Link to your CSS file
import { assets } from '../../assets/assets';

const Promotional = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false); 
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close" onClick={() => setShow(false)}>×</button>
        <div className="popup-content">
          <div className="popup-image">
            <img src={assets.deliveryboy_img} alt="Promo" />
          </div>
          <div className="popup-text">
            <h1>MealMate</h1>
            <h2>GET THE TASTIEST FOOD DELIVERY</h2>
           
            
            <p>📞 9814136254</p>
            <p>📍 Pokhara, Nepal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotional;
