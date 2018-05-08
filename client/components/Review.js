import React from 'react';

const Review = ({review}) => {
  const star = '/images/star.png';
  const stars = (num)=> {
    let starray = [];
    for(var i = 0; i < num; i++){
      starray.push(<img src={star} key={i} />);
    }
    return starray;
  };

  if(!review) return null;
  return (
    <div>
      <p><strong>Rating:</strong> {stars(review.rating).map(star => star)}</p>
      {review.content}
      <p><strong>Reviewer: {review.user.name}</strong></p>
    </div>
  );
};

export default Review;
