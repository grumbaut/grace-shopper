import React from 'react';
import { connect } from 'react-redux';
import { saveReview } from '../store';

class EditReview extends React.Component {
  constructor(props) {
    super(props);
    const review = this.props.review;
    this.state = {
      id: review ? review.id : null,
      rating: review ? review.rating : null,
      content: review ? review.content : ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   if(!this.state.content) {
  //     const { rating, content } = nextProps.review;
  //     this.setState({ rating, content });
  //   }
  // }

  onSubmit(ev) {
    const newReview = {
      id: this.state.id,
      rating: this.state.rating,
      content: this.state.content,
      productId: this.props.productId,
      userId: this.props.userId
    };
    ev.preventDefault();
    this.props.saveReview(newReview);
  }

  onChange(event) {
    this.setState({ [ event.target.name ]: event.target.value });
  }

  render() {
    const { product } = this.props;
    console.log(product);
    const { review } = this.state;
    if(!product) return null;
    if(review) return (<div>review exists</div>);
    return (
      <div>
        <h2>Review your { product.name }</h2>
        <form onSubmit={ ev => this.handleSubmit(ev) }>
          <div className='form-group'>
            <label htmlFor='name'>Name: </label>
            <input name='name' value={ name } onChange={ this.onChange } />
          </div>
          <button className='btn btn-primary btn-sm'>Add Review</button>
        </form>
      </div>
    );
  }
}

const mapState = ({reviews, user}, { match }) => ({
  review: reviews.find(review => review.id === (match.params.id)*1),
  user: user
});

const mapDispatch = (dispatch, { history }) => ({
  updateReview(userId, productId, reviewInfo) {
    dispatch(saveReview(userId, productId, reviewInfo, history));
  }
});

export default connect(mapState, mapDispatch)(EditReview);
