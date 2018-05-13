import React from 'react';
import { connect } from 'react-redux';
import { passwordReset } from '../store';

class AccountSettings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      password: this.props.user.password,
      message: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({
        firstName: nextProps.user.firstName,
        lastName: nextProps.user.lastName,
        email: nextProps.user.email,
        password: nextProps.user.password
      });
    }
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onSave(ev) {
    ev.preventDefault();
    const userInfo =  {
      id: this.props.user.id,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    };
    this.props.passwordReset(userInfo);
  }
  onChangePassword(ev) {
    ev.preventDefault();
    const userNewPassword =  {
      id: this.props.user.id,
      password: this.state.password,
      passwordPrompt: false
    };
    if (this.props.user.password !== this.state.password) {
      this.props.passwordReset(userNewPassword);
    }
    else alert('New Password Must Be Different From The Old Password');
  }
  render() {
    const { onChange, onSave, onChangePassword } = this;
    const { user } = this.props;
    const { firstName, lastName, email, password } = this.state;
    if(!user || !user.id) return <h1 className='header'>Sign in to edit your account details.</h1>;
    return (
      <div id='style'>
        <h1 className='header'>Change Account Settings</h1>
        <p><strong>Name: {user.name}</strong></p>
        <p><strong>Email: {user.email}</strong></p>
        <form onSubmit={ onSave }>
          <div className='form-group'>
            <label htmlFor='firstName'>First Name:</label>
            <input value={ firstName } name="firstName" onChange ={ onChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='lastName'>Last Name:</label>
            <input value={ lastName } name="lastName" onChange ={ onChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input value={ email } name="email" onChange ={ onChange } />
          </div>
          <button type="submit" className="btn btn-primary btn-sm"> Change Name / Email </button>
        </form>
        <form onSubmit={ onChangePassword }>
          <div className='form-group'>
            <label htmlFor='password'>Password:</label>
            <input type="password" value={ password } name="password" onChange ={ onChange } />
          </div>
          <button type="submit" className="btn btn-primary btn-sm"> Change Password </button>
        </form>
      </div>
    );
  }
}

const mapState = state => {
  const user = state.user;
  const products = state.products.filter(product => product.displayItem === true);
  const firstProduct = products.shift();
  return { products, firstProduct, user };
};

const mapDispatch = (dispatch, {history}) => {
  return {
    passwordReset: (userInfo) => dispatch(passwordReset(userInfo, history))
  };
};

export default connect(mapState, mapDispatch)(AccountSettings);
