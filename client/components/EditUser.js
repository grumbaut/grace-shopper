import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveUser, deleteUser } from '../store/users';
// import { variableDeclarator } from 'babel-types';

class EditUser extends Component {
  constructor(props){
    super(props);
    this.onSave = this.onSave.bind(this);
    this.onResetPassword = this.onResetPassword.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  onSave(ev) {
    ev.preventDefault();
    let userInfo = { id: this.props.user.id, isAdmin: !this.props.user.isAdmin };
    this.props.saveUser(userInfo);
  }
  onResetPassword(ev) {
    ev.preventDefault();
    let userInfo = { id: this.props.user.id, passwordPrompt: true };
    this.props.saveUser(userInfo);
  }
  onDelete(){
    this.props.deleteUser({ id: this.props.id });
  }

  render(){
    const { onSave, onDelete, onResetPassword } = this;
    const { user } = this.props;
    if (!user) {
      return null;
    }
    const changeStatus = user.isAdmin ? 'Remove Admin Status' : 'Give Admin Status';
    return (
      <div>
        <h3> { user.firstName } {user.lastName }</h3>
        <h3> { user.email } </h3>
        <div>
          <button type="submit" onClick={ onSave } className="btn btn-primary btn-sm">{changeStatus}</button>
        </div>
        <br />
        <div>
          <button  type ="submit" onClick={ onResetPassword } className="btn btn-primary btn-sm"> Require Password Reset</button>
        </div>
        <br />
        <div>
          <button type="submit" onClick={ onDelete } className="btn btn-primary btn-sm">Delete User</button>
        </div>
      </div>
    );
  }
}

const mapState = ({ users }, { id }) => {
  const user = users.find(user => user.id === id);
  return {
    user
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    saveUser: (userInfo) => dispatch(saveUser(userInfo)),
    deleteUser: (user) => dispatch(deleteUser(user, history))
  };
};

export default connect(mapState, mapDispatch)(EditUser);
