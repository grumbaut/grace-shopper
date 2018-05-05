import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = ({ firstProduct, products }) => {
  if(!firstProduct || !products ) return null;

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
};

const mapState = state => {
  const products = state.products.filter(product => product.displayItem === true);
  const firstProduct = products.shift();
  return { products, firstProduct };
};

export default connect(mapState)(Home);
