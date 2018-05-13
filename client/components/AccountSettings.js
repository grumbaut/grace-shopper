import React from 'react';
import { connect } from 'react-redux';
import { passwordReset } from '../store';

class AccountSettings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      password: this.props.user.password
    }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({
        firstName: nextProps.user.firstName,
        lastName: nextProps.user.lastName,
        email: nextProps.user.email,
        password: nextProps.user.password
      });
    }
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onSave(ev) {
    ev.preventDefault();
    const userInfo =  {
      id: this.props.user.id,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    };
    this.props.passwordReset(userInfo);
  }
  onChangePassword(ev) {
    ev.preventDefault();
    const userNewPassword =  {
      id: this.props.user.id,
      password: this.state.password,
      passwordPrompt: false
    };
    if (this.props.user.password !== this.state.password) {
      this.props.passwordReset(userNewPassword);
    }
  }
  render() {
    const { onChange, onSave, onChangePassword } = this;
    const { user } = this.props;
    const { firstName, lastName, email, password } = this.state;
    return (
      <div>
        <h1>Change Account Settings</h1>
        <h2>Name: {user.name}</h2>
        <h2>Email: {user.email}</h2>        
        <form onSubmit={ onSave }>
            <p>
              First Name:<br />
              <input value={ firstName } name="firstName" onChange ={ onChange } />
            </p>
            <p>
              Last Name:<br />
              <input value={ lastName } name="lastName" onChange ={ onChange } />
            </p>
            <p>
              Email:<br />
              <input value={ email } name="email" onChange ={ onChange } />
            </p>
          <button type="submit" className="btn btn-primary btn-sm"> Change Name / Email </button>
        </form>
        <form onSubmit={ onChangePassword }>
          <h2>Password: {user.password}</h2>
          <p>
            New Password:<br />
            <input value={ password } name="password" onChange ={ onChange } />
          </p>
          <button type="submit" className="btn btn-primary btn-sm"> Change Password </button>
        </form>
      </div>
    );
  }
}

const mapState = state => {
  const user = state.user;
  const products = state.products.filter(product => product.displayItem === true);
  const firstProduct = products.shift();
  return { products, firstProduct, user };
};

const mapDispatch = (dispatch, {history}) => {
  return {
    passwordReset: (userInfo) => dispatch(passwordReset(userInfo, history))
  };
};

export default connect(mapState, mapDispatch)(AccountSettings);
