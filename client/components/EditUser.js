import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveUser, deleteUser } from '../store/users';
import { variableDeclarator } from 'babel-types';

class EditUser extends Component {
  constructor(props){
    super(props);
    // this.state = {
    //   isAdmin: this.props.user ? this.props.user.isAdmin : false,
    //   // password: this.props.user ? this.props.user.password : '',
    //   // passwordPrompt: this.props.user ? this.props.user.passwordPrompt : ''
    // };
    // this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onSave(ev) {
    ev.preventDefault();
    let userToken = { id: this.props.user.id, isAdmin: !this.props.user.isAdmin };
    this.props.saveUser(userToken);
  }
  onDelete(){
    this.props.deleteUser({ id: this.props.id });
  }

  render(){
    const { onSave, onDelete } = this;
    const { user } = this.props;
    if (!user) {
      return null;
    }
    const changeStatus = user.isAdmin ? 'Remove Admin Status' : 'Give Admin Status';
    return (
      <div>
        <form onSubmit = { onSave } >
       
          <h3> { user.firstName } {user.lastName }</h3>
          <h3> { user.email } </h3>
          <button>{changeStatus}</button>
        </form>

          {/*
          <div>
            <button  type ="submit" onClick={ onChange } className="btn btn-primary btn-sm"  value = { true } name ="passwordPrompt"> Require Password Reset</button>
          </div>*/}
          <br />
          <div>
            <button type="submit" onClick={ onDelete } className="btn btn-primary btn-sm">Delete User</button>
          </div>
        
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

const mapDispatch = (dispatch, { history }) => {
  return {
    saveUser: (userToken) => dispatch(saveUser(userToken)),
    deleteUser: (user) => dispatch(deleteUser(user, history))
  }
};

export default connect(mapState, mapDispatch)(EditUser);
