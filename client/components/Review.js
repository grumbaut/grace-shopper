import React from 'react';
import { connect } from 'react-redux';

const Review = (props) => {
  const star = '/public/images/star.png';
  const review = props.review;
  return (
    <div>
      <div>Rating: <img src={star} /></div>
      {review.content}
      <p>Reviewer: {review.user.name}</p>
    </div>
  );
};

const mapState = ({ reviews }) => {
  return (
    reviews
  );
};

export default connect(mapState)(Review);
