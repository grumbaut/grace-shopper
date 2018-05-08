import React from 'react';
import { connect } from 'react-redux';
import { saveUser } from '../store'
import { Link } from 'react-router-dom';

class Home extends React.Component{
  constructor(props){
    super(props)

    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)

    this.state= {
      password: this.props.user.password ? this.props.user.password : '',
      passwordPrompt: this.props.user.passwordPrompt ? this.props.user.passwordPrompt : false
    }
  }
  onSave(ev){
    ev.preventDefault();
    const user =  {
      id: this.props.user.id,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      password: this.state.password,
      isAdmin: this.props.user.isAdmin,
      passwordPrompt: this.state.passwordPrompt
    };
    saveUser(user);
  }
  onChange(ev){
    console.log(ev.target.value, ev.target.name, 'onChange')
    this.setState({ [ev.target.name]: ev.target.value });
    this.setState({ passwordPrompt: false })
    this.onSave(ev);
  }
  render(){
    const { onChange, onSave } = this
    const { user, password } = this.props
    if(user.passwordPrompt === true){
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
    if(user.isAdmin === true){
      return (
        <div>
        <h4><Link to={'/admin'}>ADMINS: Go to the admin portal </Link> </h4>
        <h1> Welcome to a fantastic shopping experience! </h1>
        </div>
      )
    }
    return (
      <h1> Welcome to a fantastic shopping experience! </h1>
    )
  }
}


const mapState = ({ user })=> {
  console.log(user)
  return {
    user
  };
};

const mapDispatch = dispatch => {
  return {
    save: (user) => dispatch(saveUser(user)),
  }
};

export default connect(mapState, mapDispatch)(Home)

// import { Link } from 'react-router-dom';

// const Home = ({ firstProduct, products }) => {
//   if(!firstProduct || !products ) return null;

//   return (
//     <div>
//       <h2 className='header' id='featured'>Featured Products</h2>
//       <div id="carousel" className="carousel" data-ride="carousel">
//         <div className="carousel-inner">
//           <div className="carousel-item active">
//             <Link to={`/products/${firstProduct.id}`}>
//               <div className='slide'>
//                 <div>
//                   <img className="d-block w-100 img-fluid" src={ firstProduct.imageUrl } alt={ firstProduct.name } />
//                 </div>
//                 <div className='slide-text'>
//                   <h2 className='header'>{ firstProduct.name }</h2>
//                   <h3>${ firstProduct.price }</h3>
//                   <h3>{ firstProduct.description }</h3>
//                 </div>
//               </div>
//             </Link>
//           </div>
//           { products.map(product => (
//             <div className='carousel-item' key={ product.id }>
//               <Link to={`/products/${product.id}`}>
//                 <div className='slide'>
//                   <div>
//                     <img className='d-block w-100' src={ product.imageUrl } alt={ product.name } />
//                   </div>
//                   <div className='slide-text'>
//                     <h2 className='header'>{ product.name }</h2>
//                     <h3>${ product.price }</h3>
//                     <h3>{ product.description }</h3>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           )) }
//         </div>
//       </div>
//       <div id='home-text'>
//         <h1>Welcome to <span className='header'>Williams-Pomona</span>: <br />Simple designs for an elegant life.</h1>
//         <Link to='/products'><button className='btn btn-primary btn-sm' id='home-btn'>Shop Our Proudcts</button></Link>
//       </div>
//     </div>
//   );
// };

// const mapState = state => {
//   const products = state.products.filter(product => product.displayItem === true);
//   const firstProduct = products.shift();
//   return { products, firstProduct };
// };

// export default connect(mapState)(Home);
