import React from 'react';
import { connect } from 'react-redux';
import { saveUser } from '../store'

class Home extends React.Component{
  constructor(props){
    super(props)

    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)

    this.state= {
      password: this.props.user.password ? this.props.user.password : '',
      passwordPrompt: this.props.user.passwordPrompt ? this.props.user.passwordPrompt : false
    }
  }
  onSave(ev){
    ev.preventDefault();
    const user =  {
      id: this.props.user.id,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      password: this.state.password,
      isAdmin: this.props.user.isAdmin,
      passwordPrompt: this.state.passwordPrompt
    };
    saveUser(user);
  }
  onChange(ev){
    console.log(ev.target.value, ev.target.name, 'onChange')
    this.setState({ [ev.target.name]: ev.target.value });
    this.setState({ passwordPrompt: false })
    this.onSave(ev);
  }
  render(){
    const { onChange, onSave } = this
    const { user, password } = this.props
    if(!user.passwordPrompt){
      return (
        <h1> Welcome to a fantastic shopping experience! </h1>
      )
    }
    return(
      <div>
        <h1> What fun . . . it's time to change your password! </h1>
        <form onSubmit={ onSave }>
          Password: <input value = { password } name = 'password' onChange ={ onChange }/>
          <button type = 'submit' className="btn btn-primary btn-sm"> Change password </button>
        </form>
      </div>
    )
  }
}


const mapState = ({ user })=> {
  return {
    user
  };
};

const mapDispatch = dispatch => {
  return {
    save: (user) => dispatch(saveUser(user)),
  }
};

export default connect(mapState, mapDispatch)(Home)
