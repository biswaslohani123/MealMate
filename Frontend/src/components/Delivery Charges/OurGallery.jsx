import React from "react";
import "./OurGallery.css";
import { assets } from "../../assets/assets";

const OurGallery = () => {
  return (
    <div className="gallery-section" id="Our-gallery">
        <h1>Our Gallery</h1>
        
        <p>We have gathered spectacular pictures of our hotel and location to showcase style & design of our accommodations to inspire you.</p>
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
  );
};

export default OurGallery;
