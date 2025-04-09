import React from "react";

import "./About.css";
import { assets } from "../../assets/assets";

const About = () => {
  return (
   <div>
      <div className="heading">
        <p>ABOUT US</p>
      </div>
      <div className="img-section">
        <img className="image" src={assets.About_img} alt="" />
        <div className="para-section">
          <p>MealMate was born out of a passion for innovation and a desire to revolutionize the way people experience food delivery. Our journey began with a simple idea: to create a platform where customers can easily discover, explore, and order a wide variety of delicious meals from the comfort of their homes.</p>
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality dishes that cater to every taste and craving. From local favorites to modern culinary delights, we offer an extensive menu sourced from trusted chefs and ingredients, ensuring a delightful and reliable dining experience every time.</p>
          <b className="heading-2">Our Mission</b>
          <p>Our mission at MealMate is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless food ordering experience that exceeds expectations — from browsing the menu and placing an order to timely delivery and beyond.</p>

        </div>
      </div>
      <div className=" heading-3">
          <p>WHY CHOOSE US</p> 
      </div>
      <div className="one">
        <div className="one-p">
          <b>Quality Assurance:</b>
          <p>Every dish on MealMate is carefully prepared with fresh ingredients and top hygiene standards — only the best for your plate.</p>

        </div>
        <div className="two-p">
          <b>Convenience:</b>
          <p>From browsing the menu to placing an order, our simple and smooth process makes getting your favorite food super easy</p>

        </div>
        <div className="three-p">
          <b>Exceptional Customer Service:</b>
          <p>Got questions or need help? Our friendly team is always ready to assist and make sure your MealMate experience is perfect.</p>

        </div>

      </div>
     
   </div>
  );
};

export default About;
