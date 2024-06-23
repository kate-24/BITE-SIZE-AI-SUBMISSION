import React, { useState } from 'react';
import './StarRating.css';

const StarRating = ({ rating, setRating }) => {
  const handleClick = (index) => {
    setRating(index + 1); // Set rating from 1 to 5
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => (
        <span 
          key={index}
          className={`star ${index < rating ? "filled" : ""}`}
          onClick={() => handleClick(index)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
