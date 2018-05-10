import React from 'react';
import { connect } from 'react-redux';
import { saveUser } from '../store';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      password: ''
      // passwordPrompt: this.props.user.passwordPrompt ? this.props.user.passwordPrompt : false
    }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onChange(ev){
    this.setState({ password: ev.target.value });
    // this.setState({ passwordPrompt: false })
    // this.onSave(ev);
  }
  onSave(ev){
    ev.preventDefault();
    const user =  {
      id: this.props.user.id,
      // firstName: this.props.user.firstName,
      // lastName: this.props.user.lastName,
      // email: this.props.user.email,
      password: this.state.password,
      // isAdmin: this.props.user.isAdmin,
      passwordPrompt: false
    };
    console.log('user is:', user);
    saveUser(user);
  }
  
  render(){
    
    const { onChange, onSave } = this;
    const { user, password, firstProduct, products } = this.props;
    if (!firstProduct || !products ) return null;
    if (user.passwordPrompt) {
      return (
        <div>
          <h1> What fun . . . it's time to change your password! </h1>
          <form onSubmit={ onSave }>
             Password: <input value = { password } name = 'password' onChange ={ onChange }/>
             <button type='submit' className='btn btn-primary btn-sm'> Change password </button>
          </form>
        </div>
      )
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

const mapDispatch = dispatch => {
  return {
    saveUser: (user) => dispatch(saveUser(user))
  };
};

export default connect(mapState, mapDispatch)(Home);

