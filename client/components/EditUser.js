import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveUser, deleteUser } from '../store/users';
import { variableDeclarator } from 'babel-types';

class EditUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      // firstName: this.props.user ? this.props.user.firstName : '',
      // lastName: this.props.user ? this.props.user.lastName : '',
      // email: this.props.user ? this.props.user.email : '',
      isAdmin: this.props.user ? this.props.user.isAdmin : '',
      password: this.props.user ? this.props.user.password : '',
      passwordPrompt: this.props.user ? this.props.user.passwordPrompt : ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({
        // firstName: nextProps.user.firstName,
        // lastName: nextProps.user.lastName,
        // email: nextProps.user.email,
        isAdmin: nextProps.user.isAdmin,
        password: nextProps.user.password,
        passwordPrompt: nextProps.user.passwordPrompt  
      });
    }
  }
  onChange(ev){
    var bool = false;
    if (ev.target.value === 'true'){
      bool = true;
    }
    this.setState({ [ev.target.name]: bool });
  }
  onSave(ev){
    ev.preventDefault();
    const user =  {
      id: this.props.user.id,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      isAdmin: this.state.isAdmin,
      password: this.state.password,
      passwordPrompt: this.state.passwordPrompt      
    };
    this.props.saveUser(user);
  }
  onDelete(){
    this.props.deleteUser({ id: this.props.id });
  }

  render(){
    const { onSave, onChange, onDelete } = this;
    const { user } = this.props;
    if (!user) {
      return null;
    }
    return (
      <div>
        <form onSubmit = { onSave } >
       
          <h3> { user.firstName } {user.lastName }</h3>
          <h3> { user.email } </h3>
          <div>
          {
            user.isAdmin ? (
              <button type="submit" onClick={ onChange }  value = { false } name ="isAdmin" className="btn btn-primary btn-sm"> Deactivate Admin Function</button> 
            ) : (
             <button type="submit" onClick={ onChange } value = { true } name="isAdmin" className="btn btn-primary btn-sm"> Make Admin </button>
            )
          }
          </div>
          <br />
          <div>
            <button  type ="submit" onClick={ onChange } className="btn btn-primary btn-sm"  value = { true } name ="passwordPrompt"> Require Password Reset</button>
          </div>
          <br />
          <div>
            <button type="submit" onClick={ onDelete } className="btn btn-primary btn-sm">Delete User</button> 
          </div>
        </form>
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
    saveUser: (user) => dispatch(saveUser(user)),
    deleteUser: (user) => dispatch(deleteUser(user, history))
  }
};

export default connect(mapState, mapDispatch)(EditUser);
