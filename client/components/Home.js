import React from 'react';
import { connect } from 'react-redux';
import { saveUser } from '../store';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  // constructor(props){
  //   super(props);
    // this.state = {
    //   password: '',
    //   passwordPrompt: false
    // };
    // this.onChange = this.onChange.bind(this);
    // this.onSave = this.onSave.bind(this);
  // }
  // onChange(ev){
  //   this.setState({ password: ev.target.value });
  // }
  // onSave(ev){
  //   ev.preventDefault();
  //   const user =  {
  //     id: this.props.user.id,
  //     password: this.state.password,
  //     passwordPrompt: this.state.passwordPrompt
  //   };
  //   console.log('user in onSave is:', user);
  //   this.props.saveUser(user);
  // }
  
  render() {
    const { onChange, onSave } = this;
    const { user, password, firstProduct, products } = this.props;
    if (!firstProduct || !products ) return null;
    // if (!user) return null;
    if (user.passwordPrompt) {
      return (
        <div>
          <h1>Please change your password in your account settings:</h1>
          <Link to='/account-settings'>Account Settings</Link>
        </div>
      );
    }
    else {
      return (
        <div>
          <h2 className='header' id='featured'>Featured Products</h2>
          <div id="carousel" className="carousel" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <Link to={`/products/${firstProduct.id}`}>
                  <div className='slide'>
                    <div>
                      <img className="d-block w-100 img-fluid" src={ firstProduct.imageUrl } alt={ firstProduct.name } />
                    </div>
                    <div className='slide-text'>
                      <h2 className='header'>{ firstProduct.name }</h2>
                      <h3>${ firstProduct.price }</h3>
                      <h3>{ firstProduct.description }</h3>
                    </div>
                  </div>
                </Link>
              </div>
              { products.map(product => (
                <div className='carousel-item' key={ product.id }>
                  <Link to={`/products/${product.id}`}>
                    <div className='slide'>
                      <div>
                        <img className='d-block w-100' src={ product.imageUrl } alt={ product.name } />
                      </div>
                      <div className='slide-text'>
                        <h2 className='header'>{ product.name }</h2>
                        <h3>${ product.price }</h3>
                        <h3>{ product.description }</h3>
                      </div>
                    </div>
                  </Link>
                </div>
              )) }
            </div>
          </div>
          <div id='home-text'>
            <h1>Welcome to <span className='header'>Williams-Pomona</span>: <br />Simple designs for an elegant life.</h1>
            <Link to='/products'><button className='btn btn-primary btn-sm' id='home-btn'>Shop Our Proudcts</button></Link>
          </div>
        </div>
      );
    }
  }
}

const mapState = state => {
  const user = state.user;
  const products = state.products.filter(product => product.displayItem === true);
  const firstProduct = products.shift();
  return { products, firstProduct, user };
};

// const mapDispatch = (dispatch, {history}) => {  
//   return {
//     saveUser: (user) => dispatch(saveUser(user, 'home', history))
//   };
// };

export default connect(mapState)(Home);

