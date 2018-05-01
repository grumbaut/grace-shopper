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
      <div>Rating: {stars(review.rating).map(star => star)}</div>
      {review.content}
      <p>Reviewer: {review.user.name}</p>
    </div>
  );
};

export default Review;
