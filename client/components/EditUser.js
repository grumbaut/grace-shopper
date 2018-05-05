import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveUser } from '../store/users';

class editUser extends Component {
  constructor(user){
    super();
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    
    this.state = {
      password: user.password ? user.password: '',
      isAdmin: user.isAdmin ? user.isAdmin: false
    };
  }

  onSave(ev){
    ev.preventDefault();
    const user =  {
      id: this.props.id,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      password: this.state.password,
      isAdmin: this.state.isAdmin
    };
    saveUser(user);
  }

  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }

  render(){
    const { user } = this.props
    return (
      <div>
        <ul>
          <h3> Edit { user.firstName } </h3>
          {
            user.isAdmin ? <button button type='submit' className="btn btn-primary btn-sm"> Deactivate Admin Function</button> : <button type='submit' className="btn btn-primary btn-sm"> Make Admin </button>
          }
          <form onSubmit ={ this.onSave }>
            <div className='form-group'>
              <label htmlFor='password'> Reset Password: </label>
              <input name = 'password' onChange = { this.onChange } />
            </div>
          </form>
        </ul>
      </div>
    );
  }
}

const mapState = ({ users }, { id })=> {
  const user = users.find(user => user.id === id)
  return {
    user
  };
};

const mapDispatch = dispatch => {
  return {
    save: (user) => dispatch(saveUser(user)),
  };
};

export default connect(mapState, mapDispatch)(editUser);
