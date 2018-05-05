import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveUser } from '../store/users';

class editUser extends Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    
    this.state = {
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
      isAdmin: this.state.isAdmin
    };
    saveUser(user);
  }

  onChange(ev){
    ev.preventDefault();
    console.log(ev.target.name, ev.target.value)
    this.setState({ [ev.target.name]: ev.target.value });
    this.onSave(ev);
  }

  render(){
    const { onChange } = this
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
            user.isAdmin ? <button onClick={ onChange } name = 'isAdmin' value = { false } className="btn btn-primary btn-sm"> Deactivate Admin Function</button> : <button onClick={ onChange } className="btn btn-primary btn-sm" name = 'isAdmin' value = { true }> Make Admin </button>
          }
        </ul>
        <ul>
            <button button onClick={ onChange } className="btn btn-primary btn-sm"> Require Password Reset</button> 
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
