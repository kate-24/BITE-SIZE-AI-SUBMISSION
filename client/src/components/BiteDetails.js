import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';
import './BiteDetails.css';

const BiteDetails = ({ bites }) => {
  const [loading, setLoading] = useState(true);
  const [loadingPhrase, setLoadingPhrase] = useState('Loading...');

  useEffect(() => {
    const loadingPhrases = [
      'Gathering analytics...',
      'Analyzing sentiments...',
      'Taste testing...',
      'Loading fresh bites...',
    ];

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingPhrases.length);
      setLoadingPhrase(loadingPhrases[randomIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulating loading delay (remove this in production)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bites-container">
      {loading ? (
        <div className="loading-container">
          <div className="loading-text">{loadingPhrase}</div>
          <div className="loading-bar-container">
            <div className="loading-bar"></div>
          </div>
        </div>
      ) : (
        bites.map((bite) => (
          <div key={bite.id} className="bite-container">
            <h1 className="bite-address">{bite.address}</h1>
            <div className="bite-rating">
              <StarRating rating={4} setRating={(rating) => console.log(`New rating for ${bite.id}: ${rating}`)} />
              <span className="bite-reviews">(123 reviews)</span>
            </div>
            <div className="bite-summary">
              {bite.summary}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BiteDetails;
