import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../store';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { signUp } = this.props;

    return (
      <div>
        <h1>Sign Up</h1>
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
            <input name='password' onChange={ this.handleChange } />
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history }) => ({
  signUp(event, userInfo) {
    event.preventDefault();
    dispatch(signUp(userInfo, history));
  }
});

export default connect(null, mapDispatch)(SignUp);
