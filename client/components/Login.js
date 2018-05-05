import React from 'react';
import { connect } from 'react-redux';
import { attemptLogin } from '../store';

//need to define loggedIn here or elsewhere (nav)

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
      <div>
        <ul>
          <h3 className='header'> Login </h3>
          <form onSubmit={ event => attemptLogin(this.state, event)}>
            <div className='form-group'>
              <label htmlFor='email'>Email: </label>
              <input value = { email } onChange = { this.onChange } name = 'email' />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password: </label>
              <input type='password' value = { password } onChange = { this.onChange } name = 'password' />
            </div>
            <button className="btn btn-primary btn-sm"> Login </button>
          </form>
        </ul>
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
