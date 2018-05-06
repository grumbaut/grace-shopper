import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveUser, deleteUser } from '../store/users';
import { variableDeclarator } from 'babel-types';

class editUser extends Component {
  constructor(props){
    super(props);
    
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
    
    this.state = {
      passwordPrompt: false,
      isAdmin: false
    };
  }

  onSave(ev){
    ev.preventDefault();
    const user =  {
      id: this.props.user.id,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      password: this.props.user.password,
      passwordPrompt: this.state.passwordPrompt,
      isAdmin: this.state.isAdmin
    };
    saveUser(user);
  }
  onDelete(){
    deleteUser(this.props.user)
  }
  onChange(ev){
    var bool = false;
    if (ev.target.value === 'true'){
      bool = true
    }
    this.setState({ [ev.target.name]: bool });
    this.onSave(ev);
  }

  render(){
    const { onChange, onDelete } = this
    const { user } = this.props
    if (!user) {
      return null;
    }
    return (
      <div>
        <ul>
          <h3> { user.firstName } {user.lastName }</h3>
          <h3> { user.email } </h3>
          {
            user.isAdmin ? (
              <button onClick={ onChange }  value = { false } name = 'isAdmin' className="btn btn-primary btn-sm"> Deactivate Admin Function</button> 
            ) : (
             <button onClick={ onChange } value = { true } name = 'isAdmin' className="btn btn-primary btn-sm"> Make Admin </button>
            )
          }
        </ul>
        <ul>
            <button onClick={ onChange } className="btn btn-primary btn-sm"  value = { true } name = 'passwordPrompt'> Require Password Reset</button> 
        </ul>
        <ul>
        <button onClick={ onDelete } className="btn btn-primary btn-sm">Delete User</button> 
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
    deleteUser: (user) => dispatch(deleteUser(user))
  }
};

export default connect(mapState, mapDispatch)(editUser)
