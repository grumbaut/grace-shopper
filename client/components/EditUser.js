import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveUser, deleteUser } from '../store/users';

class EditUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      messageOne: false,
      messageTwo: false
    }
    this.onSave = this.onSave.bind(this);
    this.onResetPassword = this.onResetPassword.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  onSave(ev) {
    ev.preventDefault();
    this.setState({ messageOne: true });
    let userInfo = { id: this.props.user.id, isAdmin: !this.props.user.isAdmin };
    this.props.saveUser(userInfo);
  }
  onResetPassword(ev) {
    ev.preventDefault();
    this.setState({ messageTwo: true });
    let userInfo = { id: this.props.id, passwordPrompt: true };
    this.props.saveUser(userInfo);
  }
  onDelete(){
    this.props.deleteUser({ id: this.props.id });
  }

  render(){
    const { onSave, onDelete, onResetPassword } = this;
    const { messageOne, messageTwo } = this.state;
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
          { messageOne ? <h3><i>Admin status was changed</i></h3> : null }
        </div>
        <br />
        <div>
          <button type ="submit" onClick={ onResetPassword } className="btn btn-primary btn-sm"> Require Password Reset</button>
          { messageTwo ? <h3><i>Password reset was requested</i></h3> : null }
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
    user,
    id
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    saveUser: (userInfo) => dispatch(saveUser(userInfo)),
    deleteUser: (user) => dispatch(deleteUser(user, history))
  };
};

export default connect(mapState, mapDispatch)(EditUser);
