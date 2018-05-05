import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveUser } from '../store/users';

class editUser extends Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    
    this.state = {
      password: this.props.user.password ? this.props.user.password: '',
      isAdmin: this.props.user.isAdmin ? this.props.user.isAdmin: false
    };
  }

  onSave(ev){
    ev.preventDefault();
    const user =  {
      id: this.props.user.id,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
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
          <h3> { user.firstName } </h3>
          <form onSubmit ={ this.onSave }>
          {
            user.isAdmin ? <button button type='submit' className="btn btn-primary btn-sm" value = {false} name = 'isAdmin'> Deactivate Admin Function</button> : <button type='submit' className="btn btn-primary btn-sm"> Make Admin </button>
          }
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
