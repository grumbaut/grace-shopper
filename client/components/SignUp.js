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

    return (
      <div>
        <h1 className='header'>Sign Up</h1>
        <form onSubmit={ event => signUp(event, this.state) }>
          <div className='form-group'>
            <label htmlFor='firstName'>First Name:</label>
            <input name='firstName' onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='lastName'>Last Name:</label>
            <input name='lastName' onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input name='email' onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password:</label>
            <input type='password' name='password' onChange={ this.handleChange } />
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
