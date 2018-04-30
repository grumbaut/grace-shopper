import React from 'react';
import { connect } from 'react-redux';

const Review = (props) => {
  const review = props.review;
  return (
    <div>
      {review.content}
      <p>Reviewer: {review.user.name}</p>
    </div>
  );
};

