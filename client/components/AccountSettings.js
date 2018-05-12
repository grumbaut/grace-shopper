import React from 'react';
import { connect } from 'react-redux';
import { passwordReset } from '../store';

class AccountSettings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      password: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onChange(ev){
    this.setState({ password: ev.target.value });
  }
  onSave(ev){
    ev.preventDefault();
    const userInfo =  {
      id: this.props.user.id,
      password: this.state.password,
      passwordPrompt: false
    };
    this.props.passwordReset(userInfo);
  }

  render() {
    const { onChange, onSave } = this;
    const { user, password } = this.props;
    return (
      <div>
        <h1>Change Account Settings</h1>
        {user.name}
        <form onSubmit={ onSave }>
            Password: <input value = { password } name = 'password' onChange ={ onChange }/>
          <button type='submit' className='btn btn-primary btn-sm'> Change password </button>
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
