import React from "react";
import { assets } from "../../assets/assets";
import "./About.css";

const About = () => {
  return (
    <div className="about-us">
      <div className="container">
        <img src={assets.logo} alt="MealMate Logo" className="logo" />
      </div>
      <div className="container-text">
        <h2>Delivering happiness with good food.</h2>
        <p>
          MealMate Delivers has a purpose – to deliver you quality food in an
          affordable and convenient manner. <br /> We provide you the easiest
          way to order food and have it delivered to your door. We bring you a
          wide <br /> range of food choices with the best quality ingredients to
          make sure you enjoy your meal.
        </p>
      </div>
      <div className="our-values">
        <h1>Our Values</h1>
        <div className="values-row">
          <div className="value-card">
            <img src={assets.values_1} alt="Food Safety" />
            <h3>Food Safety</h3>
            <p>
              At MealMate , we take food safety very seriously. We train all
              our staff on safety standards, delivery and storage processes,
              food prep, food contamination, and food-borne illnesses.
            </p>
          </div>
          <div className="value-card">
            <img src={assets.values_2} alt="Customer First" />
            <h3>Customer First</h3>
            <p>
              We always put our customers at the centre of what we do.
              Furthermore, we are always seeking ways to consistently and
              proactively deliver a positive customer experience.
            </p>
          </div>
          <div className="value-card">
            <img src={assets.values_3} alt="Affordability" />
            <h3>Affordability</h3>
            <p>
              MealMate  wants to feed every hungry stomach in Nepal. So we are
              always committed to providing our products and services at an
              affordable price forever.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
