import React from 'react';
import { connect } from 'react-redux';
import { saveReview } from '../store';

class EditReview extends React.Component {
  constructor(props) {
    super(props);
    const review = this.props.review;
    this.state = {
      id: review ? review.id : null,
      rating: review ? review.rating : 5,
      content: review ? review.content : '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(!this.state.content) {
      const { id, rating, content, productId, userId, user} = nextProps.review;
      this.setState({ id, rating, content, productId, userId, user });
    }
  }

  onSubmit(ev) {
    const newReview = {
      id: this.state.id,
      rating: this.state.rating,
      content: this.state.content,
      productId: this.props.product.id,
      userId: this.props.user.id
    };
    ev.preventDefault();
    this.props.saveReview(newReview);
  }

  onChange(event) {
    this.setState({ [ event.target.name ]: event.target.value });
  }

  render() {
    const { product } = this.props;
    const { id, rating, content } = this.state;
    const star = '/images/star.png';
    const stars = (num)=> {
    let starray = [];
    for(var i = 0; i < num; i++){
      starray.push(<img src={star} key={i} />);
    }
    return starray;
    };
   // if(!product) return null;
    if(id) return (<div>review{product.name} exists</div>);
    return (
      <div>
        <h2>Review your { product.name }</h2>
        <form onSubmit={ ev => this.onSubmit(ev) }>
          <div className='form-group'>
            <label><strong>Rating:</strong> {stars(rating).map(star => star)} </label>
            <select name='rating' value={ rating } onChange={ this.onChange }>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Content: </label>
            <textarea rows="4" cols="50" name='content' value={ content } onChange={ this.onChange } />
          </div>
          <button className='btn btn-primary btn-sm'>Add Review</button>
        </form>
      </div>
    );
  }
}

const mapState = ({reviews, user}, { id, product }) => {
  const review = id ? reviews.find(review => review.id === id) : null;
  return {
  review: review,
  user: user,
  product: product
};
}
;

const mapDispatch = (dispatch, { history }) => ({
  saveReview(review) {
    dispatch(saveReview(review, history));
  }
});

export default connect(mapState, mapDispatch)(EditReview);
