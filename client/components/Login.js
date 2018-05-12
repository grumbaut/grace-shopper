import React from 'react';
import { connect } from 'react-redux';
import { attemptLogin } from '../store';

class Login extends React.Component {
  constructor(props){
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      email: '',
      password: ''
    };
  }

  onChange(ev){
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render(){
    const { email, password } = this.state;
    const { attemptLogin } = this.props;
    return (
      <div id='cart'>
        <h3 className='header'> Login </h3>
        <form onSubmit={ event => attemptLogin(this.state, event)}>
          <div className='form-group'>
            <input value = { email } className='element' onChange = { this.onChange } name = 'email' placeholder='Email' />
          </div>
          <div className='form-group'>
            <input type='password' className='element' value = { password } onChange = { this.onChange } name = 'password' placeholder='Password' />
          </div>
          <button className="btn btn-primary btn-sm"> Login </button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history })=> {
  return {
    attemptLogin: (credentials, event) => {
      event.preventDefault();
      dispatch(attemptLogin(credentials, history));
    }
  };
};

export default connect(null, mapDispatch)(Login);
