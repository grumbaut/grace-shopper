import React from 'react';
import { connect } from 'react-redux';
import { signUpAddUser } from '../store';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validators = {
      firstName: value => {
        if(!value) return 'First name is required.';
      },
      lastName: value => {
        if(!value) return 'Last name is required.';
      },
      email: value => {
        if(!value) return 'Email is required.';
      },
      password: value => {
        if(!value) return 'Password is required.';
      }
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const errors = Object.keys(this.validators).reduce((memo, key) => {
      const validator = this.validators[key];
      const value = this.state[key];
      const error = validator(value);
      if(error) {
        memo[key] = error;
      }
      return memo;
    }, {});
    this.setState({ errors });
    if(Object.keys(errors).length) {
      return;
    }
    this.props.signUp(this.state);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { firstName, lastName, email, password, errors } = this.state;
    return (
      <div id='style'>
        <h1 className='header'>Sign Up</h1>
        <form onSubmit={ this.handleSubmit }>
          <div className='form-group'>
            <input name='firstName' className='element' value={ firstName } onChange={ this.handleChange } placeholder='First Name' />
            <p className='error'>{ errors.firstName }</p>
          </div>
          <div className='form-group'>
            <input name='lastName' value={ lastName } className='element' onChange={ this.handleChange } placeholder='Last Name' />
            <p className='error'>{ errors.lastName }</p>
          </div>
          <div className='form-group'>
            <input name='email' value={ email } className='element' onChange={ this.handleChange } placeholder='Email' />
            <p className='error'>{ errors.email }</p>
          </div>
          <div className='form-group'>
            <input type='password' name='password' className='element' value={ password } onChange={ this.handleChange } placeholder='Password' />
            <p className='error'>{ errors.password }</p>
          </div>
          <button type='submit' className='btn btn-primary'>Sign Up</button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history }) => ({
  signUp(userInfo) {
    dispatch(signUpAddUser(userInfo, history));
  }
});

export default connect(null, mapDispatch)(SignUp);
