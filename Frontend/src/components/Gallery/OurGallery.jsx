import React from 'react'
import './OurGallery.css' // Make sure to create this CSS file

const OurGallery = () => {
  const currentYear = new Date().getFullYear()
  const experience = currentYear - 2017
  const randomNumber = Math.floor(Math.random() * 1000) + 1

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Established in 2017</h2>
      <p className="gallery-text">Experience: {experience} years</p>
      <p className="gallery-text">Visitor Count: {randomNumber}</p>
    </div>
  )
}

export default OurGallery
