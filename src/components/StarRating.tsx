import React from 'react';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const halfStar = rating - filledStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - filledStars - halfStar;

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 0l2.95 6.84 7.55.6-5.5 4.72 2 7.56L10 15.3l-7.01 4.43 2-7.56-5.5-4.72 7.55-.6L10 0z" clipRule="evenodd" />
        </svg>
      );
    }

    if (halfStar === 1) {
      stars.push(
        <svg key="half" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 0l2.95 6.84 7.55.6-5.5 4.72 2 7.56L10 15.3l-7.01 4.43 2-7.56-5.5-4.72 7.55-.6L10 0z" clipRule="evenodd" />
        </svg>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={i + filledStars + 1} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 0l2.95 6.84 7.55.6-5.5 4.72 2 7.56L10 15.3l-7.01 4.43 2-7.56-5.5-4.72 7.55-.6L10 0z" clipRule="evenodd" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="flex items-center">
      {renderStars()}
    </div>
  );
};

export default StarRating;